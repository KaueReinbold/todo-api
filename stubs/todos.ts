import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import ITodo from '../interfaces/ITodo.ts';

let todos: ITodo[] = [
  {
    id: v4.generate(),
    title: 'walk dog',
    isCompleted: true,
  },
  {
    id: v4.generate(),
    title: 'eat food',
    isCompleted: false,
  },
];

export default todos;
