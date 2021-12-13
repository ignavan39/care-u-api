import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import dayjs from 'dayjs'

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

  async getByDate(
    userId: string,
    from: string,
    to?: string,
  ): Promise<[string, Omit<Task, 'user'>[]][]> {
    const args: string[] = [userId, from];
    if (to) {
      args.push(to);
    }
    const data = await this.query(
      `
        SELECT 
          "t"."id"            AS "t_id",
          "t"."createdAt"     AS "t_createdAt",
          "t"."updatedAt"     AS "t_updatedAt",
          "t"."deletedAt"     AS "t_deletedAt",
          "t"."date"::date    AS "t_day",
          "t"."date"          AS "t_date",
          "t"."dateEnd"       AS "t_dateEnd",
          "t"."isReady"       AS "t_isReady",
          "t"."title"         AS "t_title",
          "t"."income"        AS "t_income",
          "t"."userId"        AS "t_userId"
    FROM "tasks" "t"
    ${
      to
        ? 'WHERE ("t"."userId" = $1 AND t."date"::date >= $2 ::date AND t."date"::date <= $3::date)'
        : 'WHERE ("t"."userId" = $1 AND t."date"::date = $2)'
    }
    ORDER BY t."date"
  `,
      args,
    );
    const result = new Map<string, Array<Omit<Task, 'user'>>>();
    for (const task of data) {
      const day = dayjs(task.t_day).format('YYYY-MM-DD');
      const currentDateTasks = result.get(day);
      const parsedTask: Omit<Task, 'user'> = {
        id: task.t_id,
        createdAt: task.t_createdAt,
        updatedAt: task.t_updatedAt,
        date: task.t_date,
        dateEnd: task.t_dateEnd,
        isReady: task.t_isReady,
        title: task.t_title,
        income: task.t_income,
        deletedAt: task.t_deletedAt,
      };
      if (!currentDateTasks) {
        result.set(day, [parsedTask]);
      } else {
        currentDateTasks.push(parsedTask);
        result.set(day, currentDateTasks);
      }
    }
    return Array.from(result);
  }
}
