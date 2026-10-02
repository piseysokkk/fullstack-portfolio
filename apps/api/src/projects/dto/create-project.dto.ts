import {
  IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUrl, Matches, MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'slug must be lowercase-with-dashes' })
  slug: string;

  @IsString()
  @MaxLength(300)
  summary: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @IsOptional() @IsUrl() liveUrl?: string;
  @IsOptional() @IsUrl() githubUrl?: string;
  @IsOptional() @IsUrl() imageUrl?: string;

  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() sortOrder?: number;
}