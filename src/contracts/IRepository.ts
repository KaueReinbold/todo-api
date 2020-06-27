interface IRepository<T> {
  getAll(): Promise<T[] | []>;
  add(item: T): Promise<T | null>;
  get(id: number): Promise<T | null>;
  exists(id: number): Promise<boolean>;
  update(id: number, item: T): Promise<number>;
}

export default IRepository;
