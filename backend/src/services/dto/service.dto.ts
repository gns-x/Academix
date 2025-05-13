import { IsString, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { ServiceCategory, BillingFrequency } from '../../types';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(ServiceCategory)
  category: ServiceCategory;

  @IsNumber()
  baseCost: number;

  @IsEnum(BillingFrequency)
  billingFrequency: BillingFrequency;

  @IsBoolean()
  isActive: boolean;
}

export class UpdateServiceDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsEnum(ServiceCategory)
  category?: ServiceCategory;

  @IsNumber()
  baseCost?: number;

  @IsEnum(BillingFrequency)
  billingFrequency?: BillingFrequency;

  @IsBoolean()
  isActive?: boolean;
}
