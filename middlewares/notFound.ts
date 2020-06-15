import { Response } from 'https://deno.land/x/oak@v5.2.0/mod.ts';

export default ({ response }: { response: Response }) => {
  response.status = 404;
};
