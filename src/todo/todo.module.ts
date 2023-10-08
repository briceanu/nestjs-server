import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/auth/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    TypeOrmModule.forFeature([UserRepository]),
  ],

  controllers: [TodoController],
  providers: [TodoService, TodoRepository, JwtService, ConfigService],
  exports: [TodoService, TodoRepository],
})
export class TodoModule {}
