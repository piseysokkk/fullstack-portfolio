import { IsArray, IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExperienceDto {
  @IsString() @MaxLength(100) role: string;
  @IsString() @MaxLength(100) company: string;
  @IsOptional() @IsString() location?: string;
  @IsDateString() startDate: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsString() description: string;
  @IsArray() @IsString({ each: true }) techStack: string[];
}