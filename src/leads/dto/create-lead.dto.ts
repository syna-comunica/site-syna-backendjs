import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(180)
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  company?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  message: string;
}