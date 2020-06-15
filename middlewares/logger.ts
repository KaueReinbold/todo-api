import {
  green,
  cyan,
  white,
  bgRed,
} from 'https://deno.land/std@0.53.0/fmt/colors.ts';

const X_RESPONSE_TIME: string = 'X-Response-Time';

export default {
  logger: async (
    {
      request,
      response,
    }: {
      request: any;
      response: any;
    },
    next: Function
  ) => {
    await next();

    const responseTime = response.headers.get(X_RESPONSE_TIME);
    const method = green(request.method);
    const pathname = cyan(request.url.pathname);
    const time = bgRed(white(String(responseTime)));

    console.log(`${method} ${pathname} - ${time}`);
  },
  responseTime: async (
    {
      request,
      response,
    }: {
      request: any;
      response: any;
    },
    next: Function
  ) => {
    const start = Date.now();

    await next();

    const milliSeconds: number = Date.now() - start;

    response.headers.set(X_RESPONSE_TIME, `${milliSeconds}ms`);
  },
};
