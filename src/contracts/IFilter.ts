import { Context } from 'https://deno.land/x/oak/mod.ts';

export default interface IFilter<T> {
  getAll(context: Context): void;
  post(context: Context): void;
  getById(id: number, context: Context): void;
  put(id: number, context: Context): void;
}
