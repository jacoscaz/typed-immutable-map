import { Node, NodeType, Leaf } from '../types';
import { NOTHING } from '../constants';
import { empty } from '../EmptyNode';
import { combineLeafNodes } from './combineLeafNodes';

// export class LeafNode<K, V> implements Leaf<K, V> {
//   public type: NodeType.LEAF = NodeType.LEAF;
//   public hash: number;
//   public key: K;
//   public value: V;
//
//   constructor(hash: number, key: K, value: V) {
//     this.hash = hash;
//     this.key = key;
//     this.value = value;
//   }
//
//   public modify(
//     shift: number,
//     get: (value?: V) => V,
//     hash: number,
//     key: K,
//     size: { value: number }): Node<K, V>
//   {
//     if (key === this.key) {
//       const value = get(this.value);
//
//       if (value === this.value)
//         return this;
//
//       if (value === NOTHING) {
//         --size.value;
//         return empty<K, V>();
//       }
//
//       return new LeafNode<K, V>(hash, key, value);
//     }
//
//     const value = get();
//
//     if (value === NOTHING)
//       return this;
//
//     ++size.value;
//
//     return combineLeafNodes(shift, this.hash, this, hash, new LeafNode(hash, key, value));
//   }
// }

export function modifyLeafNode<K, V>(
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

export function modifyNode<K, V>(
  node: Node<K, V>,
  shift: number,
  get: (value?: V) => V,
  hash: number,
  key: K,
  size: { value: number }): Node<K, V> {
  switch (node.type) {
    case NodeType.LEAF:
      return modifyLeafNode(node, shift, get, hash, key, size);
    default:
      return node.modify(shift, get, hash, key, size);
  }
}
