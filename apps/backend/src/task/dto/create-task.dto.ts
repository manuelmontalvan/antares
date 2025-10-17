import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskState } from '../task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Study Vue 3', description: 'Task title' })
  titulo: string;

  @ApiProperty({
    example: 'Learn Composition API and Pinia',
    description: 'Task description',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    example: 'Pendiente',
    enum: ['Pendiente', 'En Progreso', 'Completada'],
  })
  @IsEnum(TaskState)
  estado: TaskState;
}
