import { Client } from 'https://deno.land/x/mysql/mod.ts';

import environment from '../../environment.ts';

export const DATABASE_NAME: string = 'deno';
export const TABLE = {
  TODO: 'todo',
};

const client = await new Client();

client.connect({
  hostname: environment.MYSQL_HOSTNAME,
  username: environment.MYSQL_USERNAME,
  password: environment.MYSQL_PASSWORD,
  db: '',
});

const run = async () => {
  await client.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

  await client.execute(`USE ${DATABASE_NAME}`);

  const [tableExists] = await client.query(`SHOW TABLES LIKE '${TABLE.TODO}'`);

  if (!tableExists)
    await client.execute(`
        CREATE TABLE ${TABLE.TODO} (
          id int(11) NOT NULL AUTO_INCREMENT,
          title varchar(100) NOT NULL,
          isCompleted boolean NOT NULL default false,
        PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
          `);
};

run();

export default client;
