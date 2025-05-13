import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { students, ...paymentData } = createPaymentDto;

    // Validate all students and enrollments exist
    await Promise.all(
      students.map(async ({ studentId, enrollmentId }) => {
        const enrollment = await this.prisma.serviceEnrollment.findUnique({
          where: {
            id: enrollmentId,
            studentId: studentId,
          },
          include: {
            student: true,
            service: true,
          },
        });

        if (!enrollment) {
          throw new NotFoundException(
            `Service enrollment not found for student ${studentId}`,
          );
        }

        if (enrollment.status !== 'ACTIVE') {
          throw new BadRequestException(
            `Service enrollment ${enrollmentId} is not active`,
          );
        }
      }),
    );

    // Create payments for each student in a transaction
    return this.prisma.$transaction(async (prisma) => {
      const payments = await Promise.all(
        students.map(async ({ studentId, enrollmentId }) => {
          const enrollment = await prisma.serviceEnrollment.findUnique({
            where: { id: enrollmentId },
            include: {
              student: {
                include: {
                  parent: true,
                },
              },
              service: true,
            },
          });

          // Get parent's default payment method or create one
          let paymentMethod = await prisma.paymentMethod.findFirst({
            where: {
              parentId: enrollment.student.parent.id,
              isDefault: true,
            },
          });

          if (!paymentMethod) {
            paymentMethod = await prisma.paymentMethod.create({
              data: {
                parentId: enrollment.student.parent.id,
                type: paymentData.paymentMethod,
                isDefault: true,
              },
            });
          }

          // Create the service payment
          const payment = await prisma.servicePayment.create({
            data: {
              enrollmentId,
              amount: enrollment.customPrice || enrollment.service.baseCost,
              paymentDate: new Date(paymentData.paymentDate),
              paymentMethodId: paymentMethod.id,
              status: paymentData.paymentStatus,
              transactionId: paymentData.transactionReference,
            },
            include: {
              enrollment: {
                include: {
                  student: true,
                  service: true,
                },
              },
              paymentMethod: true,
            },
          });

          // Update the enrollment's billing dates
          await prisma.serviceEnrollment.update({
            where: { id: enrollmentId },
            data: {
              lastBilledDate: new Date(),
              nextBillingDate: this.calculateNextBillingDate(
                enrollment.billingCycle,
                enrollment.service.billingFrequency,
              ),
            },
          });

          // Update student balance if payment is completed
          if (paymentData.paymentStatus === PaymentStatus.COMPLETED) {
            await prisma.student.update({
              where: { id: studentId },
              data: {
                balance: {
                  increment: payment.amount,
                },
              },
            });
          }

          return payment;
        }),
      );

      return {
        success: true,
        receiptNumber: paymentData.receiptNumber,
        payments,
      };
    });
  }

  private calculateNextBillingDate(
    billingCycle: string,
    billingFrequency: string,
  ): Date {
    const now = new Date();
    const nextDate = new Date(now);

    switch (billingFrequency) {
      case 'DAILY':
        nextDate.setDate(now.getDate() + 1);
        break;
      case 'WEEKLY':
        nextDate.setDate(now.getDate() + 7);
        break;
      case 'MONTHLY':
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case 'QUARTERLY':
        nextDate.setMonth(now.getMonth() + 3);
        break;
      case 'ANNUALLY':
        nextDate.setFullYear(now.getFullYear() + 1);
        break;
      default:
        return null;
    }

    return nextDate;
  }
}
