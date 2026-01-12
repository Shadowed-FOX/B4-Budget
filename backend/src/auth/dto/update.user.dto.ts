import {
  IsEmail,
  IsOptional,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Niepoprawny format adresu email' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  surname?: string;

  @IsNumber({}, { message: 'role_id musi być liczbą' })
  @IsOptional()
  role_id?: number;

  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
  password?: string;
}