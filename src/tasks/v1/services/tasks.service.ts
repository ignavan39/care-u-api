import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from 'src/tasks/task.entity';
import { TasksRepository } from 'src/tasks/tasks.repository';
import { User } from 'src/users/user.entity';
import { CreateTaskDto } from '../dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly repository: TasksRepository) {}

  create(args: CreateTaskDto, user: User): Promise<Task> {
    const date = new Date(args.date);
    let dateEnd;
    if (args.dateEnd) {
      dateEnd = new Date(args.dateEnd);
    }
    if (args.dateEnd && dateEnd.getTime <= date.getTime) {
      throw new BadRequestException('incorrect times');
    }
    try {
      return this.repository.save({
        title: args.title,
        dateEnd,
        date,
        income: 1,
        user,
      });
    } catch {
      throw new BadRequestException(`task on time: ${args.date} alreadyExsist`);
    }
  }

  async toggle(taskId: string, userId: string): Promise<{ isReady: boolean }> {
    try {
      return await this.repository.toggle(taskId, userId);
    } catch {
      throw new NotFoundException('task not exsist');
    }
  }
}
