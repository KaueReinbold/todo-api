import { Context } from 'https://deno.land/x/oak/mod.ts';

export default interface IFilter<T> {
  getAll(context: Context): Promise<void>;
  post(context: Context): Promise<void>;
  getById(id: number, context: Context): Promise<void>;
  put(id: number, context: Context): Promise<void>;
  delete(id: number, context: Context): Promise<void>;
}
