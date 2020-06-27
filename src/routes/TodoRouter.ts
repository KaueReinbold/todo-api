import { Router, Context } from 'https://deno.land/x/oak/mod.ts';

import { IFilter } from '../filters/TodoFilter.ts';
import Services from '../../startup.ts';
import { Types } from '../../types.ts';

const TodoRouter = new Router();

TodoRouter.get('/todos', (context: Context) => {
  const todoFilter = Services.get<IFilter>(Types.IFilter);
  todoFilter.getAll(context);
});

export default TodoRouter;
