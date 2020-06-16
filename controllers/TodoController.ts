import ITodo from '../interfaces/ITodo.ts';
import TodoRepository from '../repositories/TodoRepository.ts';

const TodoController = {
  getAll: async (): Promise<ITodo[] | null> => {
    const todos = (await TodoRepository.getAll()) as ITodo[];

    return todos;
  },
  create: async (todo: ITodo): Promise<ITodo | null> => {
    todo.isCompleted = false;

    todo = await TodoRepository.add(todo);

    return todo;
  },
  getById: async (id: number): Promise<ITodo | null> => {
    let todoExists = await TodoRepository.exists(id);

    if (!todoExists) return null;

    const todo = await TodoRepository.get(id);

    return todo;
  },
  update: async (id: number, todo: ITodo): Promise<ITodo | null> => {
    todo = await TodoRepository.update(id, todo);

    return todo;
  },
  delete: async (id: number): Promise<number | null> => {
    const todoExists = await TodoRepository.exists(id);

    if (!todoExists) return null;

    await TodoRepository.delete(id);

    return id;
  },
};

export default TodoController;
