import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ServiceEnrollmentsService } from './service-enrollments.service';
import { CreateServiceEnrollmentDto } from './dto/create-service-enrollment.dto';

@Controller('service-enrollments')
export class ServiceEnrollmentsController {
  constructor(private readonly serviceEnrollmentsService: ServiceEnrollmentsService) {}

  @Post()
  async create(@Body() createServiceEnrollmentDto: CreateServiceEnrollmentDto) {
    try {
      return await this.serviceEnrollmentsService.create(createServiceEnrollmentDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
