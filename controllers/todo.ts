import {
  Request,
  Response,
  RouteParams,
} from 'https://deno.land/x/oak@v5.2.0/mod.ts';

import todos from '../stubs/todos.ts';

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
  create: async () => {},
  getById: () => {},
  update: async () => {},
  delete: () => {},
};
