import { Injectable } from '@nestjs/common';
import { News } from 'src/news/news.entity';
import { NewsRepository } from 'src/news/news.repository';
import { User } from 'src/users/user.entity';
import { CreateNewsDto } from '../dto/news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly repository: NewsRepository) {}

  async create(args: CreateNewsDto, author: User): Promise<News> {
    return this.repository.save({
      ...args,
      author,
    });
  }

  async getMany(): Promise<News[]> {
    return this.repository
      .createQueryBuilder('n')
      .orderBy('n.createdAt')
      .limit(30)
      .getMany();
  }
}
