import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskState } from '../task.entity';


export class CreateTaskDto {
@IsString()
@IsNotEmpty()
titulo: string;


@IsOptional()
@IsString()
descripcion?: string;


@IsEnum(TaskState)
estado: TaskState;
}