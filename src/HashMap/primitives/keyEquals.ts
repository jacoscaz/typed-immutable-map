
export interface KeyEquals<K> {
  (a: K, b: K): boolean;
}

export const defaultKeyEquals: KeyEquals<any> = (a, b) => a === b;
