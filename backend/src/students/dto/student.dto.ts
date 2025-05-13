import { IsString, IsNumber, IsOptional, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceCategory } from '@prisma/client';

class ParentDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;
}

class ServiceDto {
  @IsString()
  name: string;

  @IsString()
  category: ServiceCategory;
}

class ServiceEnrollmentDto {
  @ValidateNested()
  @Type(() => ServiceDto)
  service: ServiceDto;
}

export class StudentResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  cardId: string;

  @IsEmail()
  email: string;

  @IsString()
  grade: string;

  @IsNumber()
  balance: number;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  paidAmount: number;

  @IsNumber()
  remainingAmount: number;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  externalCode?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => ParentDto)
  parent?: ParentDto;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ServiceEnrollmentDto)
  ServiceEnrollment?: ServiceEnrollmentDto[];
}

export class FindStudentsQueryDto {
  @IsString()
  @IsOptional()
  search?: string;
}
