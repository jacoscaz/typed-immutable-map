
import { HashMap } from './HashMap';
import { entries } from './entries';

export const toObject = <K, V>(map: HashMap<K, V>): Record<string, V> => {
  return Object.fromEntries(entries(map));
};
