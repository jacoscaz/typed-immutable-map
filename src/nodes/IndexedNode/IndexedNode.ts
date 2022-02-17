import {ChildNode, Indexed, Node, NodeType} from '../types';
import {empty} from '../EmptyNode';
import {bitmapToIndex, hashFragment, insert, MAX_INDEX_NODE, replace, SIZE, toBitmap, remove} from '../../common';
import {modify} from '../modify';
import {toArrayNode} from './toArrayNode';

// export class IndexedNode<K, V> implements Indexed<K, V> {
//   public type: NodeType.INDEX = NodeType.INDEX;
//   public mask: number;
//   public children: ChildrenNodes<K, V>;
//
//   constructor(mask: number, children: ChildrenNodes<K, V>) {
//     this.mask = mask;
//     this.children = children;
//   }
//
//   public modify(
//     shift: number,
//     get: (value?: V) => V,
//     hash: number,
//     key: K,
//     size: { value: number }): Node<K, V>
//   {
//     const { mask, children } = this;
//     const fragment: number = hashFragment(shift, hash);
//     const bit: number = toBitmap(fragment);
//     const index: number = bitmapToIndex(mask, bit);
//     const exists: boolean = Boolean(mask & bit);
//     const current: Node<K, V> = exists ? children[index] : empty<K, V>();
//     const child = modify(current, shift + SIZE, get, hash, key, size) as ChildNode<K, V>;
//
//     if (current === child)
//       return this;
//
//     if (exists && child.type === NodeType.EMPTY) {
//       const bitmap = mask & ~bit;
//
//       if (!bitmap)
//         return empty<K, V>();
//
//       return children.length <= 2 && isLeaf(children[index ^ 1])
//         ? children[index ^ 1]
//         : new IndexedNode(bitmap, remove(index, children));
//     }
//
//     if (!exists && child.type !== NodeType.EMPTY) {
//       return children.length >= MAX_INDEX_NODE
//         ? toArrayNode(fragment, child, mask, children)
//         : new IndexedNode(mask | bit, insert(index, child, children));
//     }
//
//     return new IndexedNode<K, V>(mask, replace(index, child, children));
//   }
// }

export function modifyIndexedNode<K, V>(
  node: Indexed<K, V>,
  shift: number,
  get: (value?: V) => V,
  hash: number,
  key: K,
  size: { value: number }): Node<K, V>
{
  const { mask, children } = node;
  const fragment: number = hashFragment(shift, hash);
  const bit: number = toBitmap(fragment);
  const index: number = bitmapToIndex(mask, bit);
  const exists: boolean = Boolean(mask & bit);
  const current: Node<K, V> = exists ? children[index] : empty<K, V>();
  const child = modify(current, shift + SIZE, get, hash, key, size) as ChildNode<K, V>;

  if (current === child)
    return node;

  if (exists && child.type === NodeType.EMPTY) {
    const bitmap = mask & ~bit;

    if (!bitmap)
      return empty<K, V>();

    return children.length <= 2 && isLeaf(children[index ^ 1])
      ? children[index ^ 1]
      : { type: NodeType.INDEX, mask: bitmap, children: remove(index, children) };
  }

  if (!exists && child.type !== NodeType.EMPTY) {
    return children.length >= MAX_INDEX_NODE
      ? toArrayNode(fragment, child, mask, children)
      : { type: NodeType.INDEX, mask: mask | bit, children: insert(index, child, children) };
  }

  return { type: NodeType.INDEX, mask, children: replace(index, child, children) };
}

function isLeaf(node: Node<any, any>): boolean {
  const type = node.type;

  return type === NodeType.EMPTY ||
    type === NodeType.LEAF ||
    type === NodeType.COLLISION;
}
