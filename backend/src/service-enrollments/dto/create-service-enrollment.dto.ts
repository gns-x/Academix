import { IsArray, IsUUID, IsDate, IsNumber, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { BillingCycle } from '../../types';

export class CreateServiceEnrollmentDto {
  @IsArray()
  @IsUUID('4', { each: true })
  studentIds: string[];

  @IsUUID('4')
  serviceId: string;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsNumber()
  customPrice?: number;

  @IsEnum(BillingCycle)
  billingCycle: BillingCycle;

  @IsBoolean()
  autoRenew: boolean;
}
