import { HashMap } from './HashMap';
import { empty } from './empty';
import { reduce } from './reduce';
import { set } from './set';

export const filter: FilterFn = function filter<K, V>(
  predicate: (value: V, key: K) => boolean,
  hashmap: HashMap<K, V>): HashMap<K, V>
{
  return reduce(
    function (newMap: HashMap<K, V>, value: V, key: K) {
      return predicate(value, key)
        ? set(key, value, newMap)
        : newMap;
    },
    empty<K, V>(),
    hashmap,
  );
};

export interface FilterFn {
  <K, V>(predicate: (value: V, key?: K) => boolean, hashmap: HashMap<K, V>): HashMap<K, V>;
}
