import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create.task.dto";
import {UpdateTaskDto} from "./dto/update.task.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {Task} from "./task.entity";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[]{
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTasksWithFilters(filterDto)
    //     }else{
    //         return this.tasksService.getAllTasks();
    //     }
    // }
    //
    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks()
    // }
    //
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }
    //
    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }
    //
    // @Patch('/:id/status')
    // updateTaskById(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    // ){
    //     return this.tasksService.updateTaskStatus(id, status)
    // }
}
