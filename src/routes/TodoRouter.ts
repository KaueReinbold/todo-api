import { Router, Context } from 'https://deno.land/x/oak/mod.ts';

import Services from '../Startup.ts';

import ITodo from '../interfaces/ITodo.ts';

import IFilter from '../contracts/IFilter.ts';
import Types from '../contracts/Types.ts';

const TodoRouter = new Router();

TodoRouter.get('/todos', async (context: Context) => {
  const todoFilter = Services.get<IFilter<ITodo>>(Types.IFilter);
  await todoFilter.getAll(context);
});

export default TodoRouter;
