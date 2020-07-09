import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [TasksModule],
})
export class AppModule {}
