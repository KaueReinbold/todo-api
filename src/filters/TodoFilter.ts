import { Context } from 'https://deno.land/x/oak/mod.ts';
import { Service, Inject } from 'https://deno.land/x/di/mod.ts';

import ITodo from '../interfaces/ITodo.ts';

import Types from '../contracts/Types.ts';
import IController from '../contracts/IController.ts';
import IFilter from '../contracts/IFilter.ts';

@Service()
class TodoFilter implements IFilter<ITodo> {
  constructor(
    @Inject(Types.IController)
    private controller: IController<ITodo>
  ) {}

  async getAll(context: Context) {
    try {
      const result = await this.controller.getAll();

      context.response.status = 200;
      context.response.body = result;
    } catch (error) {
      context.response.status = 400;
      console.error(error);
    }
  }

  async post(context: Context) {
    try {
      if (!context.request.hasBody) {
        context.response.status = 400;
        context.response.body = 'No data provided';
      } else {
        const body = await context.request.body();
        const todo = body.value as ITodo;

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

  // getById: async ({
  //   response,
  //   params,
  // }: {
  //   response: Response;
  //   params: any;
  // }) => {
  //   try {
  //     const { id }: { id: number } = params;

  //     const result = await TodoController.getById(id);

  //     if (result) {
  //       response.status = 200;
  //       response.body = result;
  //     } else {
  //       response.status = 404;
  //     }
  //   } catch (error) {
  //     response.status = 400;
  //     console.error(error);
  //   }
  // },

  // update: async ({
  //   request,
  //   response,
  //   params,
  // }: {
  //   request: Request;
  //   response: Response;
  //   params: any;
  // }) => {
  //   try {
  //     if (!request.hasBody) {
  //       response.status = 400;
  //       response.body = 'No data provided';
  //     } else {
  //       const { id }: { id: number } = params;
  //       const body = await request.body();
  //       const todo = body.value as ITodo;

  //       const result = await TodoController.update(id, todo);

  //       if (result) {
  //         response.status = 200;
  //         response.body = result;
  //       } else {
  //         response.status = 404;
  //       }
  //     }
  //   } catch (error) {
  //     response.status = 400;
  //     console.error(error);
  //   }
  // },

  // delete: async ({
  //   response,
  //   params,
  // }: {
  //   request: Request;
  //   response: Response;
  //   params: any;
  // }) => {
  //   try {
  //     const { id }: { id: number } = params;
  //     const result = await TodoController.delete(id);

  //     if (result) {
  //       response.status = 200;
  //     } else {
  //       response.status = 404;
  //     }
  //   } catch (error) {
  //     response.status = 400;
  //     console.error(error);
  //   }
  // },
}

export default TodoFilter;
