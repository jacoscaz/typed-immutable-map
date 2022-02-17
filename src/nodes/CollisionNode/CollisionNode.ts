import {Collision, Leaf, Node, NodeType} from '../types';
import {NOTHING} from '../constants';
import {combineLeafNodes} from '../LeafNode';
import {newCollisionList} from './newCollisionList';

export class CollisionNode<K, V> implements Collision<K, V> {
  public type: NodeType.COLLISION = NodeType.COLLISION;

  public hash: number;
  public children: Array<Leaf<K, V>>;

  constructor(hash: number, children: Array<Leaf<K, V>>) {
    this.hash = hash;
    this.children = children;
  }

  public modify(
    shift: number,
    get: (value?: V) => V,
    hash: number,
    key: K,
    size: { value: number }): Node<K, V>
  {
    if (hash === this.hash) {
      const list: Array<Leaf<K, V>> =
        newCollisionList(this.hash, this.children, get, key, size);

      if (list === this.children)
        return this;

      return list.length > 1
        ? new CollisionNode(this.hash, list)
        : list[0];
    }

    const value = get();

    if (value === NOTHING)
      return this;

    ++size.value;

    return combineLeafNodes(shift, this.hash, this as any, hash, { type: NodeType.LEAF, hash, key, value });
  }
}
