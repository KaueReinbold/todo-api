import { config } from 'https://deno.land/x/dotenv/mod.ts';

const environment = config();

export default {
  MYSQL_HOSTNAME: String(environment.MYSQL_HOSTNAME),
  MYSQL_USERNAME: String(environment.MYSQL_USERNAME),
  MYSQL_PASSWORD: String(environment.MYSQL_PASSWORD),
  PORT: Number(environment.PORT),
};
