import { Base } from 'src/common/entities/base';
import { NewsTags } from 'src/tags/news-tags.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('news')
export class News extends Base {
  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  pictureUrl?: string;

  @ManyToOne(() => User)
  author: User;

  @OneToMany(() => NewsTags, (nt) => nt.news)
  newsTags: NewsTags[];
}
