
import type { KeyEquals } from './primitives';

import { findHash, getHash } from './primitives';

import { HashMap } from './HashMap';
import { NOTHING } from '../nodes';

export function has<K, V>(key: K, map: HashMap<K, V>, keyEquals?: KeyEquals<K>): boolean {
  const hash = findHash(key);
  return getHash(NOTHING, hash, key, map, keyEquals) !== NOTHING;
}
