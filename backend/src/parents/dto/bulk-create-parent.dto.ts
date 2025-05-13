import { IsString, IsEmail } from 'class-validator';

export class BulkCreateParentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  childrenAndGrades: string;
}
