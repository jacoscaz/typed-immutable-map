import { HashMap } from './HashMap';
import { reduce } from './reduce';

export const forEach: ForEachFn = function forEach<K, V>(
  f: (value: V, key: K) => any,
  map: HashMap<K, V>): HashMap<K, V>
{
  reduce((_, value, key) => f(value, key), null, map);

  return map;
};

export interface ForEachFn {
  <K, V>(f: (value: V, key: K) => any, hashmap: HashMap<K, V>): HashMap<K, V>;
}
