import { IsString, IsNumber, IsEnum, IsArray, IsOptional, IsDateString } from 'class-validator';
import { PaymentStatus, PaymentType } from '@prisma/client';

export class CreatePaymentDto {
  @IsArray()
  students: Array<{
    studentId: string;
    enrollmentId: string;
  }>;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentType)
  paymentMethod: PaymentType;

  @IsDateString()
  paymentDate: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  receiptNumber: string;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @IsString()
  @IsOptional()
  transactionReference?: string;

  @IsString()
  @IsOptional()
  chequeNumber?: string;

  @IsString()
  @IsOptional()
  bankName?: string;
}
