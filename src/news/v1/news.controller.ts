import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAM } from 'src/common/decorators/iam.decorator';
import { User } from 'src/users/user.entity';
import { NewsUsers } from '../news-user.entity';
import { News } from '../news.entity';
import { CreateNewsDto } from './dto/news.dto';
import { NewsService } from './services/news.service';

@UseGuards(AuthGuard())
@Controller('news')
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Post('/create')
  create(@Body() body: CreateNewsDto, @IAM() user: User): Promise<News> {
    return this.service.create(body, user);
  }

  @Post('/like/:id')
  like(@Param('id') id: string, @IAM('id') userId: string): Promise<NewsUsers> {
    return this.service.likeNews(userId, id);
  }

  @Get('/getMany')
  getMany(): Promise<News[]> {
    return this.service.getMany();
  }
}
