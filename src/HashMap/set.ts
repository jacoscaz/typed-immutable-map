import { HashMap } from './HashMap';
import { setKeyValue } from './primitives';

export const set: SetFn = setKeyValue;

export interface SetFn {
  <K, V>(key: K, value: V, map: HashMap<K, V>): HashMap<K, V>;
}
