import { ServiceCollection } from 'https://deno.land/x/di/mod.ts';

import TodoFilter from './filters/TodoFilter.ts';
import TodoController from './controllers/TodoController.ts';
import Types from './contracts/Types.ts';
import IFilter from './contracts/IFilter.ts';
import ITodo from './interfaces/ITodo.ts';
import IController from './contracts/IController.ts';
import IRepository from './contracts/IRepository.ts';
import TodoRepository from './repositories/TodoRepository.ts';

let Services: ServiceCollection;

Services = new ServiceCollection();

Services.addScoped<IRepository<ITodo>>(Types.IRepository, TodoRepository);
Services.addScoped<IFilter<ITodo>>(Types.IFilter, TodoFilter);
Services.addScoped<IController<ITodo>>(Types.IController, TodoController);

export default Services;
