import { Node, NodeType, Leaf } from '../types';
import { NOTHING } from '../constants';
import { empty } from '../EmptyNode';
import { combineLeafNodes } from './combineLeafNodes';

export function modifyLeaf<K, V>(
  node: Leaf<K, V>,
  shift: number,
  get: (value?: V) => V,
  hash: number,
  key: K,
  size: { value: number }): Node<K, V>
{
  if (key === node.key) {
    const value = get(node.value);

    if (value === node.value)
      return node;

    if (value === NOTHING) {
      --size.value;
      return empty<K, V>();
    }

    return { type: NodeType.LEAF, hash, key, value };
  }

  const value = get();

  if (value === NOTHING)
    return node;

  ++size.value;

  return combineLeafNodes(shift, node.hash, node, hash, { type: NodeType.LEAF, hash, key, value });
}
