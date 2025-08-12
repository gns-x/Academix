import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus, HttpException, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Controller('services')
@UseGuards(JwtAuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll(@Query('isActive') isActive?: boolean) {
    try {
      return await this.servicesService.findAll(isActive);
    } catch (error) {
      throw new HttpException('Failed to fetch services', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.servicesService.findOne(id);
    } catch (error) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body(ValidationPipe) createServiceDto: CreateServiceDto) {
    try {
      return await this.servicesService.create(createServiceDto);
    } catch (error) {
      throw new HttpException('Failed to create service', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateServiceDto: UpdateServiceDto) {
    try {
      return await this.servicesService.update(id, updateServiceDto);
    } catch (error) {
      throw new HttpException('Failed to update service', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.servicesService.remove(id);
    } catch (error) {
      throw new HttpException('Failed to delete service', HttpStatus.BAD_REQUEST);
    }
  }
}
