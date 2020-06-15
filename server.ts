import {
  Application,
  ListenOptions,
} from 'https://deno.land/x/oak@v5.2.0/mod.ts';
import { green, yellow } from 'https://deno.land/std@0.53.0/fmt/colors.ts';

import logger from './middlewares/logger.ts';
import notFound from './middlewares/notFound.ts';

import todoRouter from './routes/todo.ts';

const app = new Application();
const listenOptions: ListenOptions = { port: 8080 };

app.use(logger.logger);
app.use(logger.responseTime);

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

app.use(notFound);

app.addEventListener('listen', ({ secure, hostname, port }) => {
  const protocol = secure ? 'https://' : 'http://';
  const url = `${protocol}${hostname ?? 'localhost'}:${port}`;

  console.log(`${yellow('Listening on:')} ${green(url)}`);
});

await app.listen(listenOptions);
