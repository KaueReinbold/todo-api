import { Service } from 'https://deno.land/x/di/mod.ts';

import ITodo from '../interfaces/ITodo.ts';
import IController from '../contracts/IController.ts';
// import TodoRepository from '../repositories/TodoRepository.ts';

@Service()
class TodoController implements IController<ITodo> {
  async getAll(): Promise<ITodo[] | null> {
    const todos = [{ id: '1', title: 'string', isCompleted: true }];

    return todos as ITodo[] | null;
  }
  // create: async (todo: ITodo): Promise<ITodo | null> => {
  //   todo.isCompleted = false;

  //   todo = await TodoRepository.add(todo);

  //   return todo;
  // },
  // getById: async (id: number): Promise<ITodo | null> => {
  //   let todoExists = await TodoRepository.exists(id);

  //   if (!todoExists) return null;

  //   const todo = await TodoRepository.get(id);

  //   return todo;
  // },
  // update: async (id: number, todo: ITodo): Promise<ITodo | null> => {
  //   todo = await TodoRepository.update(id, todo);

  //   return todo;
  // },
  // delete: async (id: number): Promise<number | null> => {
  //   const todoExists = await TodoRepository.exists(id);

  //   if (!todoExists) return null;

  //   await TodoRepository.delete(id);

  //   return id;
  // },
}

export default TodoController;
