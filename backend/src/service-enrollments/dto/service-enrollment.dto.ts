import { IsString, IsDate, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { BillingCycle } from '../../types';

export class CreateServiceEnrollmentDto {
  @IsString()
  serviceId: string;

  @IsString()
  studentIds: string[];

  @IsString()
  externalCodes: string[]; // Array of external codes from the frontend

  @IsString()
  studentId: string;

  @IsString()
  id: string;

  @IsString()
  externalCode: string;

  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsNumber()
  customPrice?: number;

  @IsString()
  billingCycle: BillingCycle;

  @IsBoolean()
  autoRenew: boolean;
}
