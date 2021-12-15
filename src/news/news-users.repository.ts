import { EntityRepository, Repository } from 'typeorm';
import { NewsUsers } from './news-user.entity';

@EntityRepository(NewsUsers)
export class NewsUsersRepository extends Repository<NewsUsers> {}
