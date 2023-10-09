import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { AuthGuard } from 'src/auth .guard';
import { TransformInterceptor } from 'src/transform.interceptor';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @UseInterceptors(TransformInterceptor)
  @Post('/save')
  create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todoService.create(createTodoDto, user);
  }

  @Get('/getTodos')
  findAll(@GetUser() user: User): Promise<Todo[]> {
    return this.todoService.findAll(user);
  }
}
