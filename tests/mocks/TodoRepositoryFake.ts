import Todo from '../../src/models/Todo.ts';
import IRepository from '../../src/contracts/IRepository.ts';

class TodoRepositoryFake implements IRepository<Todo> {
  exists(id: number): Promise<boolean> {
    return new Promise<boolean>((r) => 1 > 0);
  }

  async getAll(): Promise<Todo[] | []> {
    return new Promise<Todo[] | []>(() => []);
  }

  async get(id: number): Promise<Todo | null> {
    return new Promise<Todo | null>(() => new Todo());
  }

  async add({ title, isCompleted }: Todo): Promise<Todo | null> {
    return new Promise<Todo | null>(() => new Todo());
  }

  async update(id: number, todo: Todo): Promise<number> {
    return new Promise<number>(() => new Todo().id);
  }

  async remove(id: number): Promise<number> {
    return new Promise<number>(() => new Todo().id);
  }
}

export default TodoRepositoryFake;
