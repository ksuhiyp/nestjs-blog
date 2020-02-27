import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@app/user/user.decorator';
import { UserEntity } from '@app/entities/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleDTO, UpdateArticleDTO } from '@app/models/article.models';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  createArticle(
    @Body(ValidationPipe) data: CreateArticleDTO,
    @User() user: UserEntity,
  ) {
    return this.articleService.create(data, user);
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.articleService.findById(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.articleService.findBySlug(slug);
  }

  @Put('id/:id')
  @UseGuards(AuthGuard())
  updateById(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateArticleDTO,
    @User() user: UserEntity,
  ) {
    return this.articleService.updateById(id, data, user);
  }

  @Put('slug/:id')
  @UseGuards(AuthGuard())
  updateBySlug(
    @Param('slug') slug: string,
    @Body(ValidationPipe) data: UpdateArticleDTO,
    @User() user: UserEntity,
  ) {
    return this.articleService.updateBySlug(slug, data, user);
  }

  @Delete('id/:id')
  @UseGuards(AuthGuard())
  deleteById(@Param('id') id: string, @User() user: UserEntity) {
    return this.articleService.deleteById(id, user);
  }

  @Delete('slug/:slug')
  @UseGuards(AuthGuard())
  deleteBySlug(@Param('slug') slug: string, @User() user: UserEntity) {
    return this.articleService.deleteBySlug(slug, user);
  }
}
