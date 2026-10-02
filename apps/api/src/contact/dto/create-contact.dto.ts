import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString() @MinLength(2) @MaxLength(100) name: string;
  @IsEmail() email: string;
  @IsString() @MinLength(10) @MaxLength(2000) message: string;

  // Honeypot: hidden in the frontend form. Humans leave it empty; bots fill it in.
  @IsOptional() @IsString() website?: string;
}