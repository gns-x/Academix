import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParentsService } from './parents.service';
import { parse } from 'csv-parse';
import { Readable } from 'stream';

type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Post('bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkCreate(@UploadedFile() file: MulterFile) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const records: any[] = [];
    const parser = parse({
      columns: true,
      skip_empty_lines: true,
    });

    return new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer.toString());

      stream
        .pipe(parser)
        .on('data', (data) => {
          if (data['Parent_First_Name'] && data['Parent_Last_Name'] && data['Parent_Email']) {
            records.push({
              name: `${data['Parent_First_Name']} ${data['Parent_Last_Name']}`.trim(),
              email: data['Parent_Email'].trim(),
              accessCode: `p-lac-${Math.random().toString(36).substring(2, 8)}`,
              phone: '', // Default empty phone
              address: '', // Default empty address
            });
          }
        })
        .on('end', async () => {
          try {
            const result = await this.parentsService.bulkCreate(records);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
