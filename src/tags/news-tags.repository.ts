import { EntityRepository, Repository } from 'typeorm';
import { NewsTags } from './news-tags.entity';

@EntityRepository(NewsTags)
export class NewsTagsRepository extends Repository<NewsTags> {}
