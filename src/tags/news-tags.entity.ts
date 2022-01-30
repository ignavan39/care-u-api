import { Base } from 'src/common/entities/base';
import { News } from 'src/news/news.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Tag } from './tag.entity';

@Entity('tags')
export class NewsTags extends Base {
  @Column('text')
  tagId: string;

  @Column('text')
  newsId: string;

  @ManyToOne(() => Tag, (tag) => tag.newsTags)
  tag: Tag;

  @ManyToOne(() => News, (news) => news.newsTags)
  news: News;
}
