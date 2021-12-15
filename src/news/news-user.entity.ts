import { User } from 'src/users/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';

@Entity('news-users')
export class NewsUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likedNews)
  user: User;

  @ManyToOne(() => News)
  news: News;
}
