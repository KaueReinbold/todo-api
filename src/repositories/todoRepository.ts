import { Service, Inject } from 'https://deno.land/x/di/mod.ts';

import Todo from '../models/Todo.ts';
import IRepository from '../contracts/IRepository.ts';
import Types from '../types/index.ts';
import IConnection from '../contracts/IConnection.ts';

@Service()
class TodoRepository implements IRepository<Todo> {
  constructor(@Inject(Types.IConnection) private connection: IConnection) {}

  async exists(id: number): Promise<boolean> {
    const [
      result,
    ] = await this.connection.query(
      `SELECT COUNT(*) count FROM todo WHERE id = ? LIMIT 1`,
      [id]
    );

    return result.count > 0;
  }

  async getAll(): Promise<Todo[] | []> {
    const todos = await this.connection.query(`SELECT * FROM todo`);

    return todos as Todo[] | [];
  }

  async get(id: number): Promise<Todo | null> {
    const [
      todo,
    ] = await this.connection.query(`SELECT * FROM todo WHERE id = ?`, [id]);

    return todo as Todo;
  }

  async add({ title, isCompleted }: Todo): Promise<Todo | null> {
    await this.connection.query(
      `INSERT INTO todo (title, isCompleted) values(?, ?)`,
      [title, isCompleted]
    );

    return {
      title: title,
      isCompleted: isCompleted,
    } as Todo;
  }

  async update(id: number, todo: Todo): Promise<number> {
    await this.connection.query(
      `UPDATE todo SET title=?, isCompleted=? WHERE id=?`,
      [todo.title, todo.isCompleted, id]
    );

    return id;
  }

  async remove(id: number): Promise<number> {
    await this.connection.query(`DELETE FROM todo WHERE id = ?`, [id]);
    return id;
  }
}

export default TodoRepository;
