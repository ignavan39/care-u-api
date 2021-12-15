import { Base } from 'src/common/entities/base';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { NewsUsers } from './news-user.entity';

@Entity('news')
export class News extends Base {
  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  pictureUrl?: string;

  @ManyToOne(() => User)
  author: User;
}
