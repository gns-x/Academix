import { BadRequestException, Controller, Get, Post, Query, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Readable } from 'stream';
import { parse } from 'csv-parse';
import { PrismaService } from '../prisma/prisma.service';
import { StudentResponseDto, FindStudentsQueryDto } from './dto/student.dto';

type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly prisma: PrismaService
  ) {}

  @Get('all')
  async getStudents() {
    return this.studentsService.getStudents();
  }

  @Get('stats')
  async getStats() {
    return this.studentsService.getStats();
  }

  @Post('bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkCreate(@UploadedFile() file: MulterFile) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!file.mimetype.includes('csv')) {
      throw new BadRequestException('Only CSV files are allowed');
    }

    const records: any[] = [];
    const parser = parse({
      delimiter: ',',
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    return new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer.toString());

      stream
        .pipe(parser)
        .on('data', (data) => {
          try {
            const firstName = data['First Name']?.trim();
            const lastName = data['Last Name']?.trim();
            
            if (firstName && lastName) {
              records.push({
                name: `${firstName} ${lastName}`,
                gender: data['Gender']?.trim() || 'Not specified',
                grade: data['Grade']?.trim() || '1',
                dateOfBirth: new Date(),
                externalCode: data['External Code']?.trim() || `STU${Date.now()}`,
                cardId: data['Code']?.trim() || `CARD${Date.now()}`,
                email: `s.${firstName.toLowerCase()}.${lastName.toLowerCase()}@academix.edu`,
              });
            }
          } catch (error) {
            console.error('Error parsing CSV row:', error);
          }
        })
        .on('end', async () => {
          try {
            const result = await this.studentsService.bulkCreate(records);
            resolve(result);
          } catch (error) {
            console.error('Error during bulk create:', error);
            reject(new BadRequestException('Failed to create students'));
          }
        })

        .on('error', (error) => {
          reject(error);
        });
    });
  }

  @Get('finance-data')
  async getStudentsFinance(@Query('search') search?: string) {
    return this.prisma.student.findMany({
      where: {
        OR: [
          { name: { contains: search || '', mode: 'insensitive' } },
          { externalCode: { contains: search || '', mode: 'insensitive' } },
          { email: { contains: search || '', mode: 'insensitive' } },
        ],
      },
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
              },
            },
          },
        },
      },
    });
  }

  @Get('students-with-service-enrollments')
  async getStudentsWithServiceEnrollments(@Query('include') include?: string) {
    const includeServiceEnrollments = include === 'serviceEnrollments';

    return this.prisma.student.findMany({
      include: {
        parent: true,
        ...(includeServiceEnrollments && {
          ServiceEnrollment: {
            include: {
              service: true,
            },
          },
        }),
      },
    });
  }

  @Get('fins')
  async findAll(@Query() query: FindStudentsQueryDto): Promise<StudentResponseDto[]> {
    return this.studentsService.findAll(query.search);
  }
}
