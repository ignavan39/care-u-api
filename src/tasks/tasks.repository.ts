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

  async getByDate(userId: string, date: string): Promise<Task[]> {
    return this.createQueryBuilder('t')
      .where('t.userId =:userId', { userId })
      .andWhere('t."date"::date =:targetDate::date', { targetDate: date })
      .getMany();
  }

  async getCountersByDates(
    from: string,
    to: string,
    userId: string,
  ): Promise<{
    date: string;
    countOfDoneTasks: number;
    countOfNotDoneTasks: number;
  }> {
    const result = await this.query(
      `
      SELECT DISTINCT (date::date) as date, 
                                COALESCE(sum(CASE WHEN "isReady" = true THEN 1 ELSE 0 END), 0) AS done_tasks,
                                COALESCE(sum(CASE WHEN "isReady" = false THEN 1 ELSE 0 END), 0) AS not_done_tasks
      FROM tasks
      WHERE "date"::date >= $1::date AND "date"::date <= $2::date AND "userId" = $3
      GROUP BY date
    `,
      [from, to, userId],
    );
    return result.map((item) => ({
      date: item.date,
      countOfDoneTasks: item.done_tasks,
      countOfNotDoneTasks: item.not_done_tasks,
    }));
  }
}
