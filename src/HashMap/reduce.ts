import { HashMap } from './HashMap';
import { fold } from './primitives';

export const reduce: ReduceFn = fold;

export interface ReduceFn {
  <K, V, R>(f: (accum: R, value: V, key: K) => R, seed: R, map: HashMap<K, V>): R;
}
