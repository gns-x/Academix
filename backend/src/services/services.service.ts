import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.service.findMany({
      where,
      include: {
        enrollments: {
          include: {
            student: true,
            parent: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            student: true,
            parent: true,
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }

  async create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        ...createServiceDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        enrollments: true,
      },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      return await this.prisma.service.update({
        where: { id },
        data: {
          ...updateServiceDto,
          updatedAt: new Date(),
        },
        include: {
          enrollments: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      // First check if there are any active enrollments
      const service = await this.prisma.service.findUnique({
        where: { id },
        include: {
          enrollments: {
            where: {
              status: 'ACTIVE',
            },
          },
        },
      });

      if (service?.enrollments.length > 0) {
        throw new Error('Cannot delete service with active enrollments');
      }

      return await this.prisma.service.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Service with ID ${id} not found or cannot be deleted`);
    }
  }
}
