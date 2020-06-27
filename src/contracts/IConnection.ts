interface IConnection {
  query<T>(sql: string, params?: any[]): Promise<T>;
}

export default IConnection;
