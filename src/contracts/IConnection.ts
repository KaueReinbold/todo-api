interface IConnection {
  query<T>(sql: string, params?: any[]): Promise<T>;
  close(): void;
}

export default IConnection;
