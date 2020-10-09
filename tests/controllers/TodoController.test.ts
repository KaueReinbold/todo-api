import { assertEquals } from 'https://deno.land/std@0.50.0/testing/asserts.ts';

import TodoController from '../../src/controllers/TodoController.ts';
import TodoRepositoryFake from '../mocks/TodoRepositoryFake.ts';
import Todo from '../../src/models/Todo.ts';

// TODO: There is a problem with the test, it seems that tsconfig is ignoring use experimental decorator find something new in the future.
Deno.test('should get all todos', () => {
  // arrange
  const todoRepository = new TodoRepositoryFake();
  const todoController = new TodoController(todoRepository);
  // act
  const result = todoController.getAll();
  // assert
  assertEquals(result, [] as Todo[]);
});
