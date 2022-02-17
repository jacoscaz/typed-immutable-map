
import { HashMap } from './HashMap';
import { empty } from './empty';
import { set } from './set';

export function fromIterable<K, V>(iterable: Iterable<[K, V]>): HashMap<K, V> {
  let map = empty<K, V>();
  for (const [key, value] of iterable) {
    map = set(key, value, map);
  }
  return map;
}

export function fromObject<K extends string | number | symbol, V>(object: Record<K, V>): HashMap<K, V> {
  let map = empty<K, V>();
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      map = set(key, object[key], map);
    }
  }
  return map;
}
