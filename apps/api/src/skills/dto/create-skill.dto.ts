import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { SkillCategory } from '../entities/skill.entity';

export class CreateSkillDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsEnum(SkillCategory)
  category: SkillCategory;

  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsInt() sortOrder?: number;
}