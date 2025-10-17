import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum TaskState {
PENDING = 'Pendiente',
IN_PROGRESS = 'En Progreso',
DONE = 'Completada',
}


@Entity('tasks')
export class Task {
@PrimaryGeneratedColumn('uuid')
id: string;


@Column({ length: 255 })
titulo: string;


@Column('text', { nullable: true })
descripcion?: string;


@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
fechaCreacion: Date;



@Column({ type: 'varchar', length: 32 })
estado: TaskState;
}