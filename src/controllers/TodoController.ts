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

  async getById(id: number): Promise<ITodo | null> {
    let todoExists = await this.repository.exists(id);

    if (!todoExists) return null;

    const todo = await this.repository.get(id);

    return todo;
  }

  async update(id: number, todo: ITodo): Promise<number | null> {
    const result = await this.repository.update(id, todo);

    return result;
  }

  async remove(id: number): Promise<number | null> {
    const todoExists = await this.repository.exists(id);

    if (!todoExists) return null;

    await this.repository.remove(id);

    return id;
  }
}

export default TodoController;
