import {ChildrenNodes, Collision, Indexed, Leaf, NodeType} from '../types';
import {hashFragment, SIZE, toBitmap} from '../../common';

export function combineLeafNodes<K, V>(
  shift: number,
  hash1: number,
  leafNode1: Leaf<K, V>,
  hash2: number,
  leafNode2: Leaf<K, V>): Collision<K, V> | Indexed<K, V>
{
  if (hash1 === hash2)
    return { type: NodeType.COLLISION, hash: hash1, children: [leafNode2, leafNode1] };

  const fragment1 = hashFragment(shift, hash1);
  const fragment2 = hashFragment(shift, hash2);

  return {
    type: NodeType.INDEX,
    mask: toBitmap(fragment1) | toBitmap(fragment2),
    children: (fragment1 === fragment2
        ? [combineLeafNodes(shift + SIZE, hash1, leafNode1, hash2, leafNode2)]
        : fragment1 < fragment2 ? [leafNode1, leafNode2] : [leafNode2, leafNode1]
    ) as any as ChildrenNodes<K, V>,
  };
}
