import { Router } from 'https://deno.land/x/oak@v5.2.0/mod.ts';
import TodoFilter from '../filters/TodoFilter.ts';

const TodoRouter = new Router();

TodoRouter.post('/todos', TodoFilter.create)
  .get('/todos', TodoFilter.getAll)
  .get('/todos/:id', TodoFilter.getById)
  .put('/todos/:id', TodoFilter.update)
  .delete('/todos/:id', TodoFilter.delete);

export default TodoRouter;
