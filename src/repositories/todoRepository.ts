import { Service } from 'https://deno.land/x/di/mod.ts';

import client, { TABLE, DATABASE_NAME } from '../database/client.ts';

import ITodo from '../interfaces/ITodo.ts';
import IRepository from '../contracts/IRepository.ts';

@Service()
class TodoRepository implements IRepository<ITodo> {
  async exists(id: number): Promise<boolean> {
    const [
      result,
    ] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE id = ? LIMIT 1`,
      [id]
    );
    return result.count > 0;
  }

  async getAll(): Promise<ITodo[] | []> {
    const todos = await client.query(`SELECT * FROM ${TABLE.TODO}`);
    return todos as ITodo[] | [];
  }

  async get(id: number): Promise<ITodo | null> {
    const [
      todo,
    ] = await client.query(`SELECT * FROM ${TABLE.TODO} WHERE id = ?`, [id]);
    return todo as ITodo;
  }

  async add({ title, isCompleted }: ITodo): Promise<ITodo | null> {
    const result = await client.query(
      `INSERT INTO ${TABLE.TODO}(title, isCompleted) values(?, ?)`,
      [title, isCompleted]
    );
    return {
      id: result.affectedRows,
      title: title,
      isCompleted: isCompleted,
    } as ITodo;
  }

  async update(id: number, todo: ITodo): Promise<number> {
    const result = await client.query(
      `UPDATE ${TABLE.TODO} SET title=?, isCompleted=? WHERE id=?`,
      [todo.title, todo.isCompleted, id]
    );
    return result.affectedRows;
  }

  async remove(id: number): Promise<number> {
    const result = await client.query(
      `DELETE FROM ${TABLE.TODO} WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

export default TodoRepository;
