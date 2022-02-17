
import type { KeyEquals } from './primitives';

import { HashMap } from './HashMap';
import { getHash, findHash } from './primitives';

export function get<K, V>(key: K, map: HashMap<K, V>, keyEquals?: KeyEquals<K>): V | undefined {
  const hash = findHash(key);
  return getHash(undefined, hash, key, map, keyEquals);
}
