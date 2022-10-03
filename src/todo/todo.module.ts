import { TodoSchema } from './model/schema/todo.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest-crud-database', { useNewUrlParser: true }),
  MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])

 ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
