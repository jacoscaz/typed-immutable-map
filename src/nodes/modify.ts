import {Node, NodeType} from './types';
import {modifyLeaf} from './LeafNode';
import {modifyEmpty} from './EmptyNode';

export function modify<K, V>(
  node: Node<K, V>,
  shift: number,
  get: (value?: V) => V,
  hash: number,
  key: K,
  size: { value: number }): Node<K, V> {
  switch (node.type) {
    case NodeType.LEAF:
      return modifyLeaf(node, shift, get, hash, key, size);
    case NodeType.EMPTY:
      return modifyEmpty(node, shift, get, hash, key, size);
    default:
      return node.modify(shift, get, hash, key, size);
  }
}
