import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async toggle(taskId: string, userId: string): Promise<{ isReady: boolean }> {
    try {
      const res = await this.query(
        `
        UPDATE tasks SET "isReady" = NOT "isReady" WHERE id = $1 AND "userId" = $2 RETURNING "isReady"
      `,
        [taskId, userId],
      );
      if (res[0].length < 1) {
        throw Error('task not found');
      }
      return res[0];
    } catch (e) {
      throw e;
    }
  }

  async getByDate(date: string, userId: string): Promise<Task[]> {
    return this.createQueryBuilder('t')
      .where('t.userId =:userId', { userId })
      .andWhere('t."date"::date =:targetDate::date', { targetDate: date })
      .getMany();
  }
}
