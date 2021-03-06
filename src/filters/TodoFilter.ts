import { Context } from 'https://deno.land/x/oak/mod.ts';
import { Service, Inject } from 'https://deno.land/x/di/mod.ts';

import Todo from '../models/Todo.ts';

import Types from '../types/index.ts';
import IController from '../contracts/IController.ts';
import IFilter from '../contracts/IFilter.ts';

@Service()
class TodoFilter implements IFilter<Todo> {
  constructor(
    @Inject(Types.IController)
    private controller: IController<Todo>
  ) {}

  async getAll(context: Context): Promise<void> {
    try {
      const result = await this.controller.getAll();

      context.response.status = 200;
      context.response.body = result;
    } catch (error) {
      context.response.status = 400;
      console.error(error);
    }
  }

  async post(context: Context): Promise<void> {
    try {
      if (!context.request.hasBody) {
        context.response.status = 400;
        context.response.body = 'No data provided';
      } else {
        const body = await context.request.body().value;
        const todo = body as Todo;

        const result = await this.controller.create(todo);

        if (result) {
          context.response.status = 201;
          context.response.body = result;
        } else {
          throw new Error('En error occurred when inserting');
        }
      }
    } catch (error) {
      context.response.status = 400;
      console.error(error);
    }
  }

  async getById(id: number, context: Context): Promise<void> {
    try {
      const result = await this.controller.getById(id);

      if (result) {
        context.response.status = 200;
        context.response.body = result;
      } else {
        context.response.status = 404;
      }
    } catch (error) {
      context.response.status = 400;
      console.error(error);
    }
  }

  async put(id: number, context: Context): Promise<void> {
    try {
      if (!context.request.hasBody) {
        context.response.status = 400;
        context.response.body = 'No data provided';
      } else {
        const body = await context.request.body().value;
        const todo = body as Todo;

        const result = await this.controller.update(id, todo);

        if (result !== null) {
          context.response.status = 200;
        } else {
          context.response.status = 404;
        }
      }
    } catch (error) {
      context.response.status = 400;
      console.error(error);
    }
  }

  async delete(id: number, context: Context): Promise<void> {
    try {
      const result = await this.controller.remove(id);

      if (result) {
        context.response.status = 200;
      } else {
        context.response.status = 404;
      }
    } catch (error) {
      context.response.status = 400;
      console.error(error);
    }
  }
}

export default TodoFilter;
