import {ListNode, Node, NodeType} from '../types';
import {empty} from '../EmptyNode';
import {modify} from '../modify';
import {hashFragment, MIN_ARRAY_NODE, replace, SIZE} from '../../common';
import {toIndexNode} from './toIndexNode';

export function modifyListNode<K, V>(
  node: ListNode<K, V>,
  shift: number,
  get: (value?: V) => V,
  hash: number,
  key: K,
  size: { value: number }): Node<K, V>
{
  const { size: count, children } = node;
  const fragment = hashFragment(shift, hash);
  const child = children[fragment];
  const newChild =
    modify(child || empty<K, V>(), shift + SIZE, get, hash, key, size);

  if (child === newChild)
    return node;

  if (isEmptyNode(child) && !isEmptyNode(newChild))
    return { type: NodeType.ARRAY, size: count + 1, children: replace(fragment, newChild, children) };

  if (!isEmptyNode(child) && isEmptyNode(newChild))
    return count - 1 <= MIN_ARRAY_NODE
      ? toIndexNode(count, fragment, children)
      : { type: NodeType.ARRAY, size: count - 1, children: replace(fragment, empty<K, V>(), children) };

  return { type: NodeType.ARRAY, size: count, children: replace(fragment, newChild, children) };
}

function isEmptyNode(node: Node<any, any>): boolean {
  return node && node.type === NodeType.EMPTY;
}
