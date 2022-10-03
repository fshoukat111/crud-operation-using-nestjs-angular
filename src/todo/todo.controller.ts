import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateTodoDTO } from './model/dtos/create-dto';
import { ValidateObjectId } from './pipes/validate-object-id.pipes';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) { }

    @Post("/new")
    async addContact(@Res() res, @Body() createTodoDTO: any) {
        const newTodo = await this.todoService.addTodo(createTodoDTO);
        return res.status(HttpStatus.OK).json({
            message: "Todo has been created successfully!",
            todo: newTodo
        })
    }

    @Get('todos')
    async getContacts(@Res() res) {
        const todoList = await this.todoService.getTodos();
        return res.status(HttpStatus.OK).json(todoList);
    }

    @Get('todo/:id')
    async getContact(@Res() res, @Param('id',new ValidateObjectId()) id) {
        const todoById = await this.todoService.getTodoById(id);
        if (!todoById) throw new NotFoundException('Todo does not exist!');
        return res.status(HttpStatus.OK).json(todoById);
    }

    @Put('/edit')
    async editContact(
        @Res() res,
        @Query('id',new ValidateObjectId()) id,
        @Body() createTodoDTO: CreateTodoDTO
    ) {
        const editedTodo = await this.todoService.updateTodo(id, createTodoDTO);
        if (!editedTodo) throw new NotFoundException('Todo does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Todo has been successfully updated',
            post: editedTodo
        })
    }

    @Delete('/delete')
    async deleteContact(@Res() res, @Query('id',new ValidateObjectId()) id) {
        const deletedContact = await this.todoService.deleteTodo(id);
        if (!deletedContact) throw new NotFoundException('Todo does not exist')
        return res.status(HttpStatus.OK).json({
            message: 'Todo has been deleted',
            contact: deletedContact
        })
    }
}
