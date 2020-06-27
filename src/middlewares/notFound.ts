import { Context } from 'https://deno.land/x/oak/mod.ts';

export default (context: Context) => {
  context.response.status = 404;
};
