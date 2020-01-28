import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '@app/entities/article.entity';
import { CreateArticleDTO, UpdateArticleDTO } from './article.models';
import { UserEntity } from '@app/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
  ) {}

  private ensureOwnership(article: ArticleEntity, user: UserEntity) {
    if (article.author.id !== user.id) {
      throw new UnauthorizedException('Incorrect user');
    }
  }

  findAll() {
    return this.articleRepo.find();
  }

  async findById(id: string): Promise<ArticleEntity> {
    const article = await this.articleRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async findBySlug(slug: string): Promise<ArticleEntity> {
    const article = await this.articleRepo.findOne({
      where: { slug },
      relations: ['author'],
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async create(
    data: CreateArticleDTO,
    user: UserEntity,
  ): Promise<ArticleEntity> {
    const article = this.articleRepo.create({ ...data, author: user });
    await article.save();
    return article;
  }

  async updateById(
    id: string,
    data: UpdateArticleDTO,
    user: UserEntity,
  ): Promise<ArticleEntity> {
    const article = await this.findById(id);
    this.ensureOwnership(article, user);
    await this.articleRepo.update({ id }, data);
    return this.articleRepo.findOne({ where: { id } });
  }

  async deleteById(id: string, user: UserEntity): Promise<ArticleEntity> {
    const article = await this.findById(id);
    this.ensureOwnership(article, user);
    await article.remove();
    return article;
  }

  async updateBySlug(
    slug: string,
    data: UpdateArticleDTO,
    user: UserEntity,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    this.ensureOwnership(article, user);
    await this.articleRepo.update({ slug }, data);
    return this.articleRepo.findOne({ where: { slug } });
  }

  async deleteBySlug(slug: string, user: UserEntity): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    this.ensureOwnership(article, user);
    await article.remove();
    return article;
  }
}
