import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_blog',
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
    }),
    SharedModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
