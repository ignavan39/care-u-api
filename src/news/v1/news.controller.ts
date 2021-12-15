import { Body, Controller, Get, Post } from '@nestjs/common';
import { IAM } from 'src/common/decorators/iam.decorator';
import { User } from 'src/users/user.entity';
import { News } from '../news.entity';
import { CreateNewsDto } from './dto/news.dto';
import { NewsService } from './services/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Post('/create')
  create(@Body() body: CreateNewsDto, @IAM() user: User): Promise<News> {
    return this.service.create(body, user);
  }

  @Get('/getMany')
  getMany(): Promise<News[]> {
    return this.service.getMany();
  }
}
