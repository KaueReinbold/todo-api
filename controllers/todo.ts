import {
  Request,
  Response,
  RouteParams,
} from 'https://deno.land/x/oak@v5.2.0/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import todos from '../stubs/todos.ts';
import ITodo from '../interfaces/ITodo.ts';

export default {
  getAll: ({
    request,
    response,
    params,
  }: {
    request: Request;
    response: Response;
    params: RouteParams;
  }) => {
    response.status = 200;
    response.body = todos;
  },
  create: async ({
    request,
    response,
    params,
  }: {
    request: Request;
    response: Response;
    params: RouteParams;
  }) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = 'No data provided';
    } else {
      const body = await request.body();
      const todo = body.value as ITodo;

      todo.id = v4.generate();
      todo.isCompleted = false;

      todos.push(todo);

      response.status = 201;
      response.body = todo;
    }
  },
  getById: () => {},
  update: async () => {},
  delete: () => {},
};
