import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { DatabaseConnectionService } from './database-connection.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    SharedModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
