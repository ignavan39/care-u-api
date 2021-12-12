import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async toggle(taskId: string, userId: string): Promise<{ isReady: boolean }> {
    const res = await this.query(
      `
        UPDATE tasks SET "isReady" = NOT "isReady" WHERE id = $1 AND "userId" = $2 RETURNING "isReady"
      `,
      [taskId, userId],
    );
    return res[0];
  }
}
