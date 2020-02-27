import { IsString, IsOptional } from 'class-validator';
import { UserProfileResponse } from './user.models';

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

export interface ArticleResponse {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: boolean;
  author: UserProfileResponse;
}