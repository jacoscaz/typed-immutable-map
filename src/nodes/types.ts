export type Node<K, V>
  = Empty<K, V>
  | Leaf<K, V>
  | Collision<K, V>
  | Indexed<K, V>
  | ListNode<K, V>;

export type ChildNode<K, V> =
  Empty<K, V> | Leaf<K, V>;

export type ChildrenNodes<K, V> = Array<ChildNode<K, V>>;

export interface Empty<K, V> {
  type: NodeType.EMPTY;
}

export interface Leaf<K, V> {
  type: NodeType.LEAF;
  hash: number;
  key: K;
  value: V;
}

export interface Collision<K, V> {
  type: NodeType.COLLISION;
  hash: number;
  children: Array<Leaf<K, V>>;
}

export interface Indexed<K, V> {
  type: NodeType.INDEX;
  mask: number;
  children: ChildrenNodes<K, V>;
}

export interface ListNode<K, V> {
  type: NodeType.ARRAY;
  size: number;
  children: Array<Node<K, V>>;
}

export const enum NodeType {
  EMPTY,
  LEAF,
  COLLISION,
  INDEX,
  ARRAY,
}
