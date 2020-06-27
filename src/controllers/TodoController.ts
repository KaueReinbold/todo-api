import { Service, Inject } from 'https://deno.land/x/di/mod.ts';

import ITodo from '../interfaces/ITodo.ts';
import IController from '../contracts/IController.ts';
import Types from '../contracts/Types.ts';
import IRepository from '../contracts/IRepository.ts';
// import TodoRepository from '../repositories/TodoRepository.ts';

@Service()
class TodoController implements IController<ITodo> {
  constructor(
    @Inject(Types.IRepository) private repository: IRepository<ITodo>
  ) {}

  async getAll(): Promise<ITodo[] | null> {
    const todos = await this.repository.getAll();

    return todos as ITodo[];
  }

  async create(todo: ITodo): Promise<ITodo | null> {
    todo.isCompleted = false;

    const result = await this.repository.add(todo);

    return result;
  }
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
