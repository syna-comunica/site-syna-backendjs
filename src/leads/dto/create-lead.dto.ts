import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MaxLength(80, { message: 'Nome muito longo (máx 80)' })
  name!: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @MaxLength(120, { message: 'Email muito longo (máx 120)' })
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120, { message: 'Empresa muito longa (máx 120)' })
  company?: string;

  @IsString()
  @IsNotEmpty({ message: 'Mensagem é obrigatória' })
  @MaxLength(2000, { message: 'Mensagem muito longa (máx 2000)' })
  message!: string;
}