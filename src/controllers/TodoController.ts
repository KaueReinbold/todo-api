import { Service, Inject } from 'https://deno.land/x/di/mod.ts';

import Todo from '../models/Todo.ts';
import IController from '../contracts/IController.ts';
import Types from '../types/index.ts';
import IRepository from '../contracts/IRepository.ts';
// import TodoRepository from '../repositories/TodoRepository.ts';

@Service()
class TodoController implements IController<Todo> {
  constructor(
    @Inject(Types.IRepository) private repository: IRepository<Todo>
  ) {}

  async getAll(): Promise<Todo[] | null> {
    const todos = await this.repository.getAll();

    return todos as Todo[];
  }

  async create(todo: Todo): Promise<Todo | null> {
    todo.isCompleted = false;

    const result = await this.repository.add(todo);

    return result;
  }

  async getById(id: number): Promise<Todo | null> {
    let todoExists = await this.repository.exists(id);

    if (!todoExists) return null;

    const todo = await this.repository.get(id);

    return todo;
  }

  async update(id: number, todo: Todo): Promise<number | null> {
    let todoExists = await this.repository.exists(id);

    if (!todoExists) return null;

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
