import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StudentResponseDto } from './dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStudents() {
    return this.prisma.student.findMany({
      select: {
        id: true,
        name: true,
        cardId: true,
        email: true,
        grade: true,
        balance: true,
        externalCode: true,
        dateOfBirth: true,
        gender: true,
        Section: true,
        photo: true,
        parent: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

async getStats() {
    const totalStudents = await this.prisma.student.count();
    const totalTeachers = await this.prisma.teacher.count();
    const activeCourses = await this.prisma.service.count({ where: { isActive: true } });
    const totalRevenue = await this.prisma.servicePayment.aggregate({
      _sum: { amount: true },
    });

    return [
      {
        name: 'Total Students',
        value: totalStudents.toString(),
        icon: 'Users',
        trend: '+12%',
        color: 'bg-blue-500',
      },
      {
        name: 'Total Teachers',
        value: totalTeachers.toString(),
        icon: 'GraduationCap',
        trend: '+1%',
        color: 'bg-purple-500',
      },
      {
        name: 'Active Services',
        value: activeCourses.toString(),
        icon: 'BookOpen',
        trend: '+8%',
        color: 'bg-green-500',
      },
      {
        name: 'Revenue',
        value: totalRevenue._sum.amount?.toFixed(2) || '0.00',
        icon: 'DollarSign',
        trend: 'MAD',
        color: 'bg-orange-500',
      },
    ];
  }
  async bulkCreate(students: any[]) {
    const results = {
      successful: 0,
      failed: 0,
      errors: [] as string[],
    };
    for (const student of students) {
        if (!student.name || !student.email || !student.grade || !student.dateOfBirth) {
          results.failed++;
          results.errors.push(`Missing required field for student: ${JSON.stringify(student)}`);
          continue;
        }
      }

    for (const student of students) {
      try {
        await this.prisma.student.create({
          data: student,
        });
        results.successful++;
      } catch (error) {
        results.failed++;
        results.errors.push(
          `Failed to create student ${student.name}: ${error.message}`
        );
      }
    }

    if (results.failed === students.length) {
      throw new BadRequestException('All student creations failed', {
        description: results.errors.join('\n'),
      });
    }

    return results;
  }
  async findAll(search?: string): Promise<StudentResponseDto[]> {
    const students = await this.prisma.student.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { cardId: { contains: search, mode: 'insensitive' } },
              { externalCode: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      include: {
        parent: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
        ServiceEnrollment: {
          include: {
            service: {
              select: {
                name: true,
                category: true,
                baseCost: true,
              },
            },
            payments: {
              where: {
                status: 'COMPLETED',
              },
              select: {
                amount: true,
              },
            },
          },
          where: {
            status: 'ACTIVE',
          },
        },
      },
    });

    return students.map(student => {
      // Calculate total amount from all active service enrollments
      const totalAmount = student.ServiceEnrollment?.reduce((sum, enrollment) => {
        return sum + (enrollment.customPrice || enrollment.service.baseCost);
      }, 0) || 0;

      // Calculate total paid amount from all completed payments
      const paidAmount = student.ServiceEnrollment?.reduce((sum, enrollment) => {
        return sum + enrollment.payments.reduce((paymentSum, payment) => {
          return paymentSum + payment.amount;
        }, 0);
      }, 0) || 0;

      // Calculate remaining amount
      const remainingAmount = totalAmount - paidAmount;

      return {
        ...student,
        totalAmount,
        paidAmount,
        remainingAmount,
        balance: remainingAmount, // Update balance to match remaining amount
      };
    });
  }
}
