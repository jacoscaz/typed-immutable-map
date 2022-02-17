
import { Node } from '../nodes';

export interface HashMap<K, V> {
  node: Node<K, V>;
  size: number;
}
