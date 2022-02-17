import { EMPTY } from '../nodes';
import { HashMap } from './HashMap';

const EMPTY_MAP: HashMap<any, any> = { node: EMPTY, size: 0 };

export function empty<K, V>(): HashMap<K, V> {
  return EMPTY_MAP;
}
