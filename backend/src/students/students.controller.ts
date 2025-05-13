import { BadRequestException, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StudentsService } from './students.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { parse } from 'csv-parse';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentResponseDto, FindStudentsQueryDto } from './dto/student.dto';

// Add these types
type MulterFile = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService, private prisma: PrismaService) {}

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

    const records: any[] = [];
    const parser = parse({
        delimiter: ',',
        columns: true,
        skip_empty_lines: true,
        trim: true, // Trims whitespace from headers and values
    });

    return new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer.toString());

      stream
        .pipe(parser)
        .on('data', (data) => {
            try {
                const firstName = data['First Name'];
                const lastName = data['Last Name'];
                console.log('firstName:', firstName);
                console.log('lastName:', lastName);
              records.push({
                name: `${firstName} ${lastName}`,
                gender: data['Gender'],
                grade: data['Grade'],
                dateOfBirth: new Date(),
                externalCode: data['External Code'],
                cardId: data['Code'],
                email: `s.${(data['First Name'] || '').toLowerCase()}.${(data['Last Name'] || '').toLowerCase()}@elitelac.com`,
              });
            } catch (error) {
              console.error('Error parsing CSV row:', data, error);
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
  async getStudents_finance(@Query('search') search: string) {
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
