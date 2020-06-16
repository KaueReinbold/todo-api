import {
  Request,
  Response,
  RouteParams,
} from 'https://deno.land/x/oak@v5.2.0/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import todos from '../stubs/todos.ts';
import ITodo from '../interfaces/ITodo.ts';
import todoRepository from '../repositories/todoRepository.ts';

export default {
  getAll: async ({
    request,
    response,
    params,
  }: {
    request: Request;
    response: Response;
    params: RouteParams;
  }) => {
    try {
      const data = await todoRepository.getAll();

      response.status = 200;
      response.body = data;
    } catch (error) {
      response.status = 400;

      console.error(error);
    }
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
    try {
      if (!request.hasBody) {
        response.status = 400;
        response.body = 'No data provided';
      } else {
        const body = await request.body();
        const todo = body.value as ITodo;

        todo.isCompleted = false;

        const { lastInsertId } = await todoRepository.add(todo);

        todo.id = lastInsertId;

        response.status = 201;
        response.body = todo;
      }
    } catch (error) {
      response.status = 400;
      console.error(error);
    }
  },
  getById: async ({
    request,
    response,
    params,
  }: {
    request: Request;
    response: Response;
    params: any;
  }) => {
    try {
      let { id }: { id: string } = params;
      const todoIsAvailable = await todoRepository.exists({ id });

      if (!todoIsAvailable) {
        response.status = 404;
      } else {
        const todo = await todoRepository.get({ id });

        response.status = 200;
        response.body = todo;
      }
    } catch (error) {
      response.status = 400;
      console.error(error);
    }
  },
  update: async ({
    request,
    response,
    params,
  }: {
    request: Request;
    response: Response;
    params: any;
  }) => {
    try {
      if (!request.hasBody) {
        response.status = 400;
        response.body = 'No data provided';
      } else {
        let { id }: { id: string } = params;
        const todoIsAvailable = await todoRepository.exists({
          id,
        });

        if (!todoIsAvailable) {
          response.status = 404;
        } else {
          const body = await request.body();
          const todoUpdated = body.value as ITodo;

          await todoRepository.update({
            id,
            title: todoUpdated.title,
            isCompleted: todoUpdated.isCompleted,
          });

          todoUpdated.id = id;

          response.status = 200;
          response.body = todoUpdated;
        }
      }
    } catch (error) {
      response.status = 400;
      console.error(error);
    }
  },
  delete: async ({
    request,
    response,
    params,
  }: {
    request: Request;
    response: Response;
    params: any;
  }) => {
    try {
      let { id }: { id: string } = params;
      const todoIsAvailable = await todoRepository.exists({
        id,
      });

      if (!todoIsAvailable) {
        response.status = 404;
      } else {
        await todoRepository.delete({
          id,
        });

        response.status = 200;
      }
    } catch (error) {
      response.status = 400;
      console.error(error);
    }
  },
};
