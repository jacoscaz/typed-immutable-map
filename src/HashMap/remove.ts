import { HashMap } from './HashMap';
import { setKeyValue } from './primitives';
import { NOTHING } from '../nodes/constants';

export function remove<K, V>(key: K, map: HashMap<K, V>): HashMap<K, V>;

export function remove<K, V>(key: K, map: HashMap<K, V>) {
  return setKeyValue<K, V>(key, NOTHING as V, map);
}
