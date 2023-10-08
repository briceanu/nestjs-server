import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { User } from 'src/auth/entities/user.entity';

export class TodoRepository extends Repository<Todo> {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {
    super(
      todoRepository.target,
      todoRepository.manager,
      todoRepository.queryRunner,
    );
  }

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { todo, isEditing, complete } = createTodoDto;
    const savedTodo = this.create({
      todo,
      isEditing,
      complete,
      user,
      //assigns the todo to the specific user
    });
    await this.save(savedTodo);
    return savedTodo;
  }

  async getTodos(user: User): Promise<Todo[]> {
    const query = this.createQueryBuilder('todo');
    query.where({ user }); //shows exactly the todos owned by users
    const todos = await query.getMany();
    return todos;
  }
}
