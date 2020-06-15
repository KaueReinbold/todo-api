import {
  Application,
  ListenOptions,
  Router,
} from 'https://deno.land/x/oak@v5.2.0/mod.ts';

const app = new Application();
const listenOptions: ListenOptions = { port: 8080 };
const router = new Router();

router.get('/', ({ response }: { response: any }) => {
  response.body = { message: 'Hello World' };
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen(listenOptions);

console.log('running on port ', listenOptions.port);
