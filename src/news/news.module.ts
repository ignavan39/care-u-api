import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsUsersRepository } from './news-users.repository';
import { NewsRepository } from './news.repository';
import { NewsController } from './v1/news.controller';
import { NewsService } from './v1/services/news.service';
@Module({
  imports: [TypeOrmModule.forFeature([NewsRepository, NewsUsersRepository])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
