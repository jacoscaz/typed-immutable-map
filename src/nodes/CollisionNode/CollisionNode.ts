import {Collision, Leaf, Node, NodeType} from '../types';
import {NOTHING} from '../constants';
import {combineLeafNodes} from '../LeafNode';
import {newCollisionList} from './newCollisionList';

export function modifyCollisionNode<K, V>(
  node: Collision<K, V>,
  shift: number,
  get: (value?: V) => V,
  hash: number,
  key: K,
  size: { value: number }): Node<K, V>
{
  if (hash === node.hash) {
    const list: Array<Leaf<K, V>> =
      newCollisionList(node.hash, node.children, get, key, size);

    if (list === node.children)
      return node;

    return list.length > 1
      ? { type: NodeType.COLLISION, hash: node.hash, children: list }
      : list[0];
  }

  const value = get();

  if (value === NOTHING)
    return node;

  ++size.value;

  return combineLeafNodes(shift, node.hash, node as any, hash, { type: NodeType.LEAF, hash, key, value });
}
