import { Base } from 'src/common/entities/base';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('tasks')
export class Task extends Base {
  @Column('timestamp')
  date: Date;

  @Column('timestamp', { nullable: true })
  dateEnd: Date;

  @Column('boolean', { default: false })
  isReady: boolean;

  @Column('text')
  title: string;

  @ManyToOne(() => User)
  user: User;

  @Column('integer')
  income: number;
}
