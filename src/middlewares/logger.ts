import {
  green,
  cyan,
  white,
  bgRed,
} from 'https://deno.land/std@0.53.0/fmt/colors.ts';
import { Context } from 'https://deno.land/x/oak/mod.ts';

const X_RESPONSE_TIME: string = 'X-Response-Time';

export default {
  logger: async (context: Context, next: Function) => {
    await next();

    const responseTime = context.response.headers.get(X_RESPONSE_TIME);
    const method = green(context.request.method);
    const pathname = cyan(context.request.url.pathname);
    const time = bgRed(white(String(responseTime)));

    console.log(`${method} ${pathname} - ${time}`);
  },
  responseTime: async (context: Context, next: Function) => {
    const start = Date.now();

    await next();

    const milliSeconds: number = Date.now() - start;

    context.response.headers.set(X_RESPONSE_TIME, `${milliSeconds}ms`);
  },
};
