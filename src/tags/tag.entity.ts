import { Base } from 'src/common/entities/base';
import { Column, Entity, OneToMany } from 'typeorm';
import { NewsTags } from './news-tags.entity';

@Entity('tags')
export class Tag extends Base {
  @Column('text')
  name: string;

  @OneToMany(() => NewsTags, (nt) => nt.tag)
  newsTags: NewsTags[];
}
