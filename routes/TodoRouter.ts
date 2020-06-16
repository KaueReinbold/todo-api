import { Router } from 'https://deno.land/x/oak@v5.2.0/mod.ts';

import todoController from '../controllers/todo.ts';

const TodoRouter = new Router();

TodoRouter.post('/todos', todoController.create)
  .get('/todos', todoController.getAll)
  .get('/todos/:id', todoController.getById)
  .put('/todos/:id', todoController.update)
  .delete('/todos/:id', todoController.delete);

export default TodoRouter;
