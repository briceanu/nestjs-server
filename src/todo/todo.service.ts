import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoRepository } from './todo.repository';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    //this InjectRepository is from typeORM
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto, user);
  }

  findAll(user: User): Promise<Todo[]> {
    return this.todoRepository.getTodos(user);
  }
}
