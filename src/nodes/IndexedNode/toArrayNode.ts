import {ChildNode, ChildrenNodes, ListNode, NodeType} from '../types';

export function toArrayNode<K, V>(
  fragment: number,
  child: ChildNode<K, V>,
  bitmap: number,
  children: ChildrenNodes<K, V>): ListNode<K, V>
{
  const array: ChildrenNodes<K, V> = [];
  let bit = bitmap;
  let count = 0;

  for (let i = 0; bit; ++i) {
    if (bit & 1)
      array[i] = children[count++];
    bit >>>= 1;
  }

  array[fragment] = child;

  return { type: NodeType.ARRAY, size: count + 1, children: array };
}
