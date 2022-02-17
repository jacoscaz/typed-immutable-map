import {Node, NodeType} from './types';
import {modifyLeaf} from './LeafNode';
import {modifyEmpty} from './EmptyNode';
import {modifyListNode} from './ArrayNode';
import {modifyIndexedNode} from './IndexedNode';

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
    case NodeType.ARRAY:
      return modifyListNode(node, shift, get, hash, key, size);
    case NodeType.INDEX:
      return modifyIndexedNode(node, shift, get, hash, key, size);
    default:
      return node.modify(shift, get, hash, key, size);
  }
}
