export default interface IController<T> {
  getAll(): Promise<T[] | null>;
}
