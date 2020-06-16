import { config } from 'https://deno.land/x/dotenv/mod.ts';

const environment = config();

export default {
  MYSQL_PASSWORD: environment.MYSQL_PASSWORD,
  PORT: Number(environment.PORT),
};
