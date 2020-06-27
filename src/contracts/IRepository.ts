interface IRepository<T> {
  getAll(): Promise<T[] | []>;
  add(item: T): Promise<T | null>;
}

export default IRepository;
