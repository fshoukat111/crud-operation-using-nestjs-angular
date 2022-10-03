import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDTO } from './model/dtos/create-dto';
import { ITodo } from './model/interfaces/todo.interface';

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<ITodo>) { }

    async getTodos(): Promise<ITodo[]> {
        return await this.todoModel.find().exec();
    }

    async getTodoById(id: string): Promise<ITodo> {
        return await this.todoModel.findById(id).exec();
    }

    async addTodo(createContactDTO: any): Promise<ITodo> {
        debugger
         const addNewTodo = await new this.todoModel(createContactDTO);
         return addNewTodo.save();
    }

    async updateTodo(id, createTodoDTO: CreateTodoDTO): Promise<ITodo> {
        return await this.todoModel.findByIdAndUpdate(id, createTodoDTO, { new: true });
    }

    async deleteTodo(id): Promise<ITodo> {
        return await this.todoModel.findByIdAndRemove(id);
    }

}
