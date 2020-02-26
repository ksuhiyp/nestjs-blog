import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@app/entities/article.entity';
import { UserModule } from '@app/user/user.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), UserModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
