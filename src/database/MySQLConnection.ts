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

    this._client.connect({
      hostname: environment.MYSQL_HOSTNAME,
      username: environment.MYSQL_USERNAME,
      password: environment.MYSQL_PASSWORD,
      db: '',
    });

    this.createIfNotExists();
  }
  async useDatabase(): Promise<void> {
    await this._client.execute(`USE ${this.DATABASE_NAME}`);
  }
  async createIfNotExists(): Promise<void> {
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
  }

  async query<T>(sql: string, params?: any[]): Promise<T> {
    this.useDatabase();
    return (await this._client.query(sql, params)) as T;
  }
}

export default MySQLConnection;
