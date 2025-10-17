import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TasksService {
constructor(@InjectRepository(Task) private repo: Repository<Task>) {}


create(dto: CreateTaskDto) {
const task = this.repo.create({ ...dto });
return this.repo.save(task);
}


findAll() {
return this.repo.find({ order: { fechaCreacion: 'DESC' } });
}


async findOne(id: string) {
const task = await this.repo.findOneBy({ id });
if (!task) throw new NotFoundException('Task not found');
return task;
}


async update(id: string, dto: UpdateTaskDto) {
const task = await this.findOne(id);
Object.assign(task, dto);
return this.repo.save(task);
}


async remove(id: string) {
const task = await this.findOne(id);
return this.repo.remove(task);
}
}