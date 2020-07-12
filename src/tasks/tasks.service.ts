import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create.task.dto";
import {TaskRepository} from "./task.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}


    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //
    //     let tasks = this.getAllTasks();
    //
    //     if(status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }
    //     if(search){
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //         );
    //     }
    //
    //     return tasks;
    // }
    //
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    //

    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id)
        if(!found){
            throw new NotFoundException(`Task with id:${id} not found.`);
        }
        return found;
    }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id)
    //     if(!found){
    //         throw new NotFoundException(`Task with id:${id} not found.`);
    //     }
    //     return found;
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
      return this.taskRepository.createTask(createTaskDto)
    }

    async deleteTask(id: number): Promise<void> {
        const result =  await this.taskRepository.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found.`)
        }
    }
    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }
    //
    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id)
    //     if(task){
    //         task.status = status;
    //     }
    //     return task;
    // }
}
