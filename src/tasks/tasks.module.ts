import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './v1/services/tasks.service';
import { TasksController } from './v1/tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
