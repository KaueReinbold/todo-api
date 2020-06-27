import { Client } from 'https://deno.land/x/mysql/mod.ts';
import { Service } from 'https://deno.land/x/di/mod.ts';

import environment from '../../environment.ts';

import IConnection from '../contracts/IConnection.ts';

@Service()
class MySQLConnection implements IConnection {
  private _client: Client;
  public DATABASE_NAME: string = 'deno';
  public TABLE = {
    TODO: 'todo',
  };
  get client(): Client {
    return this._client;
  }

  constructor() {
    this._client = new Client();
  }

  async useDatabase(): Promise<void> {
    await this._client.execute(`USE ${this.DATABASE_NAME}`);
  }
  async createIfNotExists(): Promise<void> {
    this.open();

    await this._client.execute(
      `CREATE DATABASE IF NOT EXISTS ${this.DATABASE_NAME}`
    );

    await this.useDatabase();

    const [tableExists] = await this._client.query(
      `SHOW TABLES LIKE '${this.TABLE.TODO}'`
    );

    if (!tableExists)
      await this._client.execute(`
          CREATE TABLE ${this.TABLE.TODO} (
            id int(11) NOT NULL AUTO_INCREMENT,
            title varchar(100) NOT NULL,
            isCompleted boolean NOT NULL default false,
          PRIMARY KEY (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
            `);

    this.close();
  }

  async query<T>(sql: string, params?: any[]): Promise<T> {
    this.open();
    this.useDatabase();

    const result = (await this._client.query(sql, params)) as T;

    this.close();

    return result;
  }

  async open(): Promise<void> {
    this._client.connect({
      hostname: environment.MYSQL_HOSTNAME,
      username: environment.MYSQL_USERNAME,
      password: environment.MYSQL_PASSWORD,
      db: '',
    });
  }

  async close(): Promise<void> {
    this._client.close();
  }
}

export default MySQLConnection;
