import ITodo from '../interfaces/ITodo.ts';

export default {
  exists: async ({ id }: ITodo) => {},
  getAll: async () => {},
  get: async ({ id }: ITodo) => {},
  add: async ({ title, isCompleted }: ITodo) => {},
  update: async ({ id, title, isCompleted }: ITodo) => {},
  delete: async ({ id }: ITodo) => {},
};
