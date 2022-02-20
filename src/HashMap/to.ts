
import { HashMap } from './HashMap';
import { entries } from './entries';

export interface ToObjectFn {
  <K extends string | number | symbol, V>(map: HashMap<K, V>): Record<K, V>;
  <K, V>(map: HashMap<K, V>): Record<string, V>;
}

export const toObject: ToObjectFn = <K, V>(map: HashMap<K, V>) => {
  return Object.fromEntries(entries(map));
};
