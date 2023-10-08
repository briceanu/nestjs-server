import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  todo: string;

  @IsNotEmpty()
  @IsBoolean()
  isEditing: boolean;

  @IsBoolean()
  @IsNotEmpty()
  complete: boolean;
}
