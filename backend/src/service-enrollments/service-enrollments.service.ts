import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceEnrollmentDto } from './dto/create-service-enrollment.dto';
import { BillingFrequency } from '../types';
import { Logger } from '@nestjs/common';

@Injectable()
export class ServiceEnrollmentsService {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger('ServiceEnrollmentsService');

  private calculateNextBillingDate(startDate: Date, endDate: Date): Date {
    const date = null;

    // switch (billingFrequency) {
    //   case BillingFrequency.DAILY:
    //     date.setDate(date.getDate() + 1);
    //     break;
    //   case BillingFrequency.WEEKLY:
    //     date.setDate(date.getDate() + 7);
    //     break;
    //   case BillingFrequency.MONTHLY:
    //     date.setMonth(date.getMonth() + 1);
    //     break;
    //   case BillingFrequency.QUARTERLY:
    //     date.setMonth(date.getMonth() + 3);
    //     break;
    //   case BillingFrequency.ANNUALLY:
    //     date.setFullYear(date.getFullYear() + 1);
    //     break;
    //   case BillingFrequency.ONE_TIME:
    //     return null;
    // }

    return date;
  }

  async create(createServiceEnrollmentDto: CreateServiceEnrollmentDto) {
    const {
      serviceId,
      studentIds,
      startDate,
      endDate,
      customPrice,
      billingCycle,
      autoRenew,
    } = createServiceEnrollmentDto;
    // Validate service exists and is active
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (!service.isActive) {
      throw new BadRequestException('Service is not active');
    }

    // Validate dates
    if (endDate && startDate > endDate) {
      throw new BadRequestException('Start date must be before end date');
    }


    const results = {
      success: true,
      enrollments: [],
      errors: [] as string[],
    };

    // Process each student
    for (const studentId of studentIds) {
      try {
        // Check if student exists and get parent
        const student = await this.prisma.student.findUnique({
          where: { externalCode: studentId },
          include: { parent: true },
        });
        if (!student) {
          throw new Error(`Student with ID ${studentId} not found`);
        }

        if (!student.parentId) {
          throw new Error(`Student with ID ${studentId} has no associated parent`);
        }
        // Check for existing active enrollment
        const existingEnrollment = await this.prisma.serviceEnrollment.findFirst({
          where: {
            serviceId,
            studentId,
            status: 'ACTIVE',
          },
        });
        if (existingEnrollment) {
          throw new Error(`Student with ID ${studentId} already has an active enrollment for this service`);
        }

        // Calculate next billing date
        const nextBillingDate = this.calculateNextBillingDate(
          startDate,
          endDate,
        //   service.billingFrequency
        );

        // Create enrollment
        const enrollment = await this.prisma.serviceEnrollment.create({
          data: {
            serviceId,
            studentId: student.id,
            parentId: student.parentId,
            startDate,
            endDate,
            status: 'ACTIVE',
            customPrice,
            billingCycle,
            autoRenew,
            nextBillingDate,
          },
          include: {
            service: true,
            student: true,
            parent: true,
          },
        });
        results.enrollments.push(enrollment);
      } catch (error) {
        this.logger.error(error.message);
        results.success = false;
        results.errors.push(error.message);
      }
    }

    // If no enrollments were created successfully, throw an error
    if (results.enrollments.length === 0) {
      throw new BadRequestException('Failed to create any enrollments', {
        description: results.errors.join('\n'),
      });
    }

    return results;
  }
}
