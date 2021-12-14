import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAM } from 'src/common/decorators/iam.decorator';
import { User } from 'src/users/user.entity';
import { Task } from '../task.entity';
import {
  CreateTaskDto,
  GetManyTasksDto,
  GetTaskCountersDto,
} from './dto/tasks.dto';
import { TasksService } from './services/tasks.service';
import {
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('tasks')
@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @ApiOperation({ summary: 'create task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ type: Task })
  @Post('/create')
  create(@Body() body: CreateTaskDto, @IAM() user: User): Promise<Task> {
    return this.service.create(body, user);
  }

  @ApiOperation({ summary: 'toggle task status' })
  @ApiParam({ name: 'id', type: 'uuid' })
  @Post('/toggle/:id')
  toggle(
    @Param('id') id: string,
    @IAM('id') userId: string,
  ): Promise<{
    isReady: boolean;
  }> {
    return this.service.toggle(id, userId);
  }

  @ApiOperation({ summary: 'delete task' })
  @ApiParam({ name: 'id', type: 'uuid' })
  @ApiResponse({ type: Boolean })
  @Delete('/delete/:id')
  delete(@Param('id') id: string, @IAM('id') userId: string): Promise<boolean> {
    return this.service.delete(id, userId);
  }

  @ApiOperation({ summary: 'get task by date' })
  @ApiBody({ type: GetManyTasksDto })
  @ApiResponse({ type: [Task] })
  @Get('/getMany')
  getMany(
    @Query() query: GetManyTasksDto,
    @IAM('id') userId: string,
  ): Promise<Task[]> {
    return this.service.getMany(query, userId);
  }

  @ApiOperation({ summary: 'get task counters by date' })
  @ApiBody({ type: GetTaskCountersDto })
  @ApiResponse({ type: [Task] })
  @Get('/getCounters')
  getCounters(
    @Query() query: GetTaskCountersDto,
    @IAM('id') userId: string,
  ): Promise<
    {
      date: string;
      countOfDoneTasks: number;
      countOfNotDoneTasks: number;
    }[]
  > {
    return this.service.getCounters(query, userId);
  }
}
