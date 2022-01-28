import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NewsUsers } from 'src/news/news-user.entity';
import { NewsUsersRepository } from 'src/news/news-users.repository';
import { News } from 'src/news/news.entity';
import { NewsRepository } from 'src/news/news.repository';
import { User } from 'src/users/user.entity';
import { CreateNewsDto } from '../dto/news.dto';

@Injectable()
export class NewsService {
  constructor(
    private readonly repository: NewsRepository,
    private readonly newsUsersRepository: NewsUsersRepository,
  ) {}

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

  async likeNews(userId: string, newsId: string): Promise<NewsUsers> {
    try {
      return await this.newsUsersRepository.save({
        user: {
          id: userId,
        },
        news: {
          id: newsId,
        },
      });
    } catch (e) {
      if (e?.routine === '_bt_check_unique') {
        throw new BadRequestException('duplicate like');
      }
      throw new InternalServerErrorException(e);
    }
  }
}
