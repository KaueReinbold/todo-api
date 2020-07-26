import { ServiceCollection } from 'https://deno.land/x/di/mod.ts';

import TodoFilter from './filters/TodoFilter.ts';
import TodoController from './controllers/TodoController.ts';
import Types from './types/index.ts';
import IFilter from './contracts/IFilter.ts';
import Todo from './models/Todo.ts';
import IController from './contracts/IController.ts';
import IRepository from './contracts/IRepository.ts';
import TodoRepository from './repositories/TodoRepository.ts';
import IConnection from './contracts/IConnection.ts';
import MySQLConnection from './database/MySQLConnection.ts';

let Services: ServiceCollection;

Services = new ServiceCollection();

Services.addScoped<IConnection>(Types.IConnection, MySQLConnection);
Services.addScoped<IRepository<Todo>>(Types.IRepository, TodoRepository);
Services.addScoped<IFilter<Todo>>(Types.IFilter, TodoFilter);
Services.addScoped<IController<Todo>>(Types.IController, TodoController);

export default Services;
