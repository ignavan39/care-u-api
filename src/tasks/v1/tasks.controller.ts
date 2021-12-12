import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAM } from 'src/common/decorators/iam.decorator';
import { User } from 'src/users/user.entity';
import { CreateTaskDto } from './dto/tasks.dto';
import { TasksService } from './services/tasks.service';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Post('/create')
  create(@Body() body: CreateTaskDto, @IAM() user: User) {
    return this.service.create(body, user);
  }

  @Post('/toggle/:id')
  toggle(@Param('id') id: string, @IAM('id') userId: string) {
    return this.service.toggle(id, userId);
  }
}
