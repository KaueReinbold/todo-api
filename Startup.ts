import { ServiceCollection } from 'https://deno.land/x/di/mod.ts';

import TodoFilter, { IFilter } from './src/filters/TodoFilter.ts';
import TodoController, {
  IController,
} from './src/controllers/TodoController.ts';
import { Types } from './types.ts';

let Services: ServiceCollection;

Services = new ServiceCollection();

export const RegisterService = (): ServiceCollection => {
  Services.addScoped<IFilter>(Types.IFilter, TodoFilter);
  Services.addScoped<IController>(Types.IController, TodoController);

  return Services;
};

export default Services;
