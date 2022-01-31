import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { News } from './news.entity';

@Unique(['userId', 'newsId'])
@Entity('news-users')
export class NewsUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  newsId: string;

  @Column('text')
  userId: string;

  @ManyToOne(() => User, (user) => user.likedNews)
  user: User;

  @ManyToOne(() => News)
  news: News;
}
