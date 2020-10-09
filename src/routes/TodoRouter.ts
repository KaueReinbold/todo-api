import { Router, Context } from 'https://deno.land/x/oak/mod.ts';

import Services from '../Startup.ts';

import Todo from '../models/Todo.ts';

import IFilter from '../contracts/IFilter.ts';
import Types from '../types/index.ts';

const TodoRouter = new Router();

TodoRouter.get('/todos', async (context: Context) => {
  const todoFilter = Services.get<IFilter<Todo>>(Types.IFilter);
  await todoFilter.getAll(context);
})
  .post('/todos', async (context: Context) => {
    const todoFilter = Services.get<IFilter<Todo>>(Types.IFilter);
    await todoFilter.post(context);
  })
  .get('/todos/:id', async (context: any) => {
    const todoFilter = Services.get<IFilter<Todo>>(Types.IFilter);
    const id = context.params.id as number;

    await todoFilter.getById(id, context);
  })
  .put('/todos/:id', async (context: any) => {
    const todoFilter = Services.get<IFilter<Todo>>(Types.IFilter);
    const id = context.params.id as number;

    await todoFilter.put(id, context);
  })
  .delete('/todos/:id', async (context: any) => {
    const todoFilter = Services.get<IFilter<Todo>>(Types.IFilter);
    const id = context.params.id as number;

    await todoFilter.delete(id, context);
  });

export default TodoRouter;
