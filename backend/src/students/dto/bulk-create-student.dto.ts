import { IsString, IsDateString, IsOptional } from 'class-validator';

export class BulkCreateStudentDto {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsString()
  gender: string;

  @IsString()
  grade: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  externalCode: string;

  @IsString()
  cardId: string;
}
