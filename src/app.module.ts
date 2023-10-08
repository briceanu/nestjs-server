// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo/todo.controller';
import { JwtService } from '@nestjs/jwt';
import { TodoService } from './todo/todo.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get('DB_HOST'),
        port: configService.get('PORT'),
        username: configService.get('DB_USERNAME'),
        // it also works with password: process.env.DB_PASSWORD,
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      }),
    }),
    TodoModule,
    AuthModule,
  ],
  controllers: [TodoController, AuthController],
  providers: [JwtService, TodoService],
})
export class AppModule {}
