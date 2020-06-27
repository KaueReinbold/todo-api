import { Service, Inject } from 'https://deno.land/x/di/mod.ts';

import client, { TABLE, DATABASE_NAME } from '../database/client.ts';

import ITodo from '../interfaces/ITodo.ts';
import IRepository from '../contracts/IRepository.ts';

@Service()
class TodoRepository implements IRepository<ITodo> {
  // exists: async (id: number) => {
  //   const [
  //     result,
  //   ] = await client.query(
  //     `SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE id = ? LIMIT 1`,
  //     [id]
  //   );
  //   return result.count > 0;
  // },
  async getAll(): Promise<ITodo[] | []> {
    const todos = await client.query(`SELECT * FROM ${TABLE.TODO}`);
    return todos as ITodo[] | [];
  }
  // get: async (id: number) => {
  //   const todos = await client.query(
  //     `SELECT * FROM ${TABLE.TODO} WHERE id = ?`,
  //     [id]
  //   );
  //   return todos[0];
  // },
  // add: async ({ title, isCompleted }: ITodo) => {
  //   const result = await client.query(
  //     `INSERT INTO ${TABLE.TODO}(title, isCompleted) values(?, ?)`,
  //     [title, isCompleted]
  //   );
  //   return {
  //     id: result.affectedRows,
  //     title: title,
  //     isCompleted: isCompleted,
  //   } as ITodo;
  // },
  // update: async (id: number, todo: ITodo) => {
  //   const result = await client.query(
  //     `UPDATE ${TABLE.TODO} SET title=?, isCompleted=? WHERE id=?`,
  //     [todo.title, todo.isCompleted, id]
  //   );
  //   return result.affectedRows;
  // },
  // delete: async (id: number) => {
  //   const result = await client.query(
  //     `DELETE FROM ${TABLE.TODO} WHERE id = ?`,
  //     [id]
  //   );
  //   return result.affectedRows;
  // },
}

export default TodoRepository;
