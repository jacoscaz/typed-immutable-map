import {NOTHING} from '../constants';
// import { LeafNode } from '../LeafNode';
import {insert, remove} from '../../common';
import {Leaf, NodeType} from '../types';

export function newCollisionList<K, V>(
  hash: number,
  list: Array<Leaf<K, V>>,
  get: (value?: V) => V,
  key: K,
  size: { value: number }): Array<Leaf<K, V>>
{
  const length = list.length;

  for (let i = 0; i < length; ++i) {
    const child = list[i];

    if (child.key === key) {
      const value = child.value;
      const newValue = get(value);

      if (newValue === value)
        return list;

      if (newValue === NOTHING) {
        --size.value;
        return remove(i, list);
      }

      return insert(i, { type: NodeType.LEAF, hash, key, value: newValue }, list);
    }
  }

  const newValue = get();

  if (newValue === NOTHING)
    return list;

  ++size.value;

  return insert(length, { type: NodeType.LEAF, hash, key, value: newValue }, list);
}
