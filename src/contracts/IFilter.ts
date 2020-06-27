import { Context } from 'https://deno.land/x/oak/mod.ts';

export default interface IFilter<T> {
  getAll(context: Context): void;
}
