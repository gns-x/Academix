import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParentsService {
  constructor(private prisma: PrismaService) {}

  async bulkCreate(parents: any[]) {
    const results = {
      successful: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const parent of parents) {
      try {
        await this.prisma.parent.create({
          data: parent,
        });
        results.successful++;
      } catch (error) {
        results.failed++;
        results.errors.push(
          `Failed to create parent ${parent.name}: ${error.message}`
        );
      }
    }

    if (results.failed === parents.length) {
      throw new BadRequestException('All parent creations failed', {
        description: results.errors.join('\n'),
      });
    }

    return results;
  }
}
