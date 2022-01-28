import { User } from 'src/users/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { News } from './news.entity';

@Unique(['user.id', 'news.id'])
@Entity('news-users')
export class NewsUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likedNews)
  user: User;

  @ManyToOne(() => News)
  news: News;
}
