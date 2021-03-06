import 'https://cdn.pika.dev/@abraham/reflection@^0.7.0';

import { Application, ListenOptions } from 'https://deno.land/x/oak/mod.ts';
import { green, yellow } from 'https://deno.land/std@0.53.0/fmt/colors.ts';

import environment from './environment.ts';

import logger from './src/middlewares/logger.ts';
import notFound from './src/middlewares/notFound.ts';

import TodoRouter from './src/routes/TodoRouter.ts';
import MySQLConnection from './src/database/MySQLConnection.ts';

const connection = new MySQLConnection();
const app = new Application();
const listenOptions: ListenOptions = { port: environment.PORT };

connection.createIfNotExists();

app.use(logger.logger);
app.use(logger.responseTime);

app.use(TodoRouter.routes());
app.use(TodoRouter.allowedMethods());

app.use(notFound);

app.addEventListener('listen', ({ secure, hostname, port }) => {
  const protocol = secure ? 'https://' : 'http://';
  const url = `${protocol}${hostname ?? 'localhost'}:${port}`;

  console.log(`${yellow('Listening on:')} ${green(url)}`);
});

await app.listen(listenOptions);
