import { IsString, IsOptional } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  body: string;
}

export class UpdateArticleDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  body: string;
}
