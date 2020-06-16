import client, { TABLE, DATABASE_NAME } from '../database/client.ts';

import ITodo from '../interfaces/ITodo.ts';

export default {
  exists: async ({ id }: ITodo) => {
    const [
      result,
    ] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE id = ? LIMIT 1`,
      [id]
    );
    return result.count > 0;
  },
  getAll: async () => {
    const todos = await client.query(`SELECT * FROM ${TABLE.TODO}`);

    return todos;
  },
  get: async ({ id }: ITodo) => {
    return await client.query(`SELECT * FROM ${TABLE.TODO} WHERE id = ?`, [id]);
  },
  add: async ({ title, isCompleted }: ITodo) => {
    return await client.query(
      `INSERT INTO ${TABLE.TODO}(title, isCompleted) values(?, ?)`,
      [title, isCompleted]
    );
  },
  update: async ({ id, title, isCompleted }: ITodo) => {
    const result = await client.query(
      `UPDATE ${TABLE.TODO} SET title=?, isCompleted=? WHERE id=?`,
      [title, isCompleted, id]
    );
    return result.affectedRows;
  },
  delete: async ({ id }: ITodo) => {},
};
