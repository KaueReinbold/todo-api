export default interface IController<T> {
  getAll(): Promise<T[] | null>;
  create(item: T): Promise<T | null>;
  getById(id: number): Promise<T | null>;
}
