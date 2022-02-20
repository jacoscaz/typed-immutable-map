import {
  deepStrictEqual,
  strictEqual,
  notStrictEqual,
} from 'assert';

import {
  HashMap,
  fromIterable,
  fromObject,
  toObject,
  get,
  set,
  entries,
  keys,
  values,
  forEach,
  has,
  map as mapmap,
  filter,
  reduce,
  remove,
  size,
  empty,
} from '../src/HashMap';

describe('HashMap', () => {

  describe('toObject()', () => {
    it('should return an object that includes all entries', () => {
      let map = empty();
      map = set('a', 1, map);
      map = set('b', 2, map);
      map = set('c', 3, map);
      deepStrictEqual(toObject(map), { a: 1, b: 2, c: 3 });
    });
    it('should not loose typings when using object-compatible keys', () => {
      // This is a typings test. If something breaks, TypeScript will refuse to
      // compile this file.
      type KeyType = 'foo' | 'bar';
      type ValueType = any;
      const map = empty<KeyType, ValueType>();
      const obj: Record<KeyType, ValueType> = toObject(map);
    });
  });

  describe('fromObject()', () => {
    it('should create a map that includes all properties', () => {
      const map = fromObject({ a: 1, b: 2, c: 3 });
      deepStrictEqual(toObject(map), { a: 1, b: 2, c: 3 });
    });
  });

  describe('fromIterable()', () => {
    it('should create a map that includes all entries', () => {
      const map = fromIterable(Object.entries({ a: 1, b: 2, c: 3 }));
      deepStrictEqual(toObject(map), { a: 1, b: 2, c: 3 });
    });
  });

  describe('get()', () => {
    it('should return the value for a given key', () => {
      const map = fromObject({ a: 1, b: 2 });
      strictEqual(get('a', map), 1);
    });
    it('should return undefined for a key that is not present', () => {
      const map = fromObject({ a: 1, b: 2 });
      strictEqual(get('c', map), undefined);
    });
  });

  describe('has()', () => {
    it('should return true if the key is present', () => {
      const map = fromObject({ a: 1, b: 2 });
      strictEqual(has('a', map), true);
    });
    it('should return false if the key is not present', () => {
      const map = fromObject({ a: 1, b: 2 });
      strictEqual(has('c', map), false);
    });
  });

  describe('set()', () => {
    it('should return a new HashMap', () => {
      const o = empty<string, number>();
      const n = set('a', 1, o);
      notStrictEqual(o, n);
    });
    it('should set the value for a given key', () => {
      let map = fromObject<string, number>({ a: 1, b: 2 });
      strictEqual(get('c', map), undefined);
      map = set('c', 3, map);
      strictEqual(get('c', map), 3);
    });
  });

  describe('remove()', () => {
    it('should return a new HashMap', () => {
      const o = fromObject({ a: 1, b: 2, c: 3 });
      const n = remove('a', o);
      notStrictEqual(o, n);
    });
    it('should remove the value for a given key', () => {
      let map = fromObject<string, number>({ a: 1, b: 2, c: 3 });
      strictEqual(get('c', map), 3);
      map = remove('c', map);
      strictEqual(get('c', map), undefined);
    });
  });

  describe('keys()', () => {
    it('should return an iterator covering all keys', () => {
      const map = fromObject<string, number>({ a: 1, b: 2, c: 3 });
      const keysArr = Array.from(keys(map));
      deepStrictEqual(keysArr, ['a', 'b', 'c']);
    });
  });

  describe('values()', () => {
    it('should return an iterator covering all values', () => {
      const map = fromObject<string, number>({ a: 1, b: 2, c: 3 });
      const valuesArr = Array.from(values(map));
      deepStrictEqual(valuesArr, [1, 2, 3]);
    });
  });

  describe('entries()', () => {
    it('should return an iterator covering all entries', () => {
      const map = fromObject<string, number>({ a: 1, b: 2, c: 3 });
      const entriesArr = Array.from(entries(map));
      deepStrictEqual(entriesArr, [['a', 1], ['b', 2], ['c', 3]]);
    });
  });

  describe('size()', () => {
    it('should return the number of entries', () => {
      const map = fromObject<string, number>({ a: 1, b: 2, c: 3 });
      strictEqual(size(map), 3);
    });
  });

  describe('empty()', () => {
    it('should return an empty map', () => {
      const map = empty();
      strictEqual(size(map), 0);
    });
  });

  describe('forEach()', () => {
    it('should iterate over all entries', () => {
      const map = fromObject<string, number>({ a: 1, b: 2, c: 3 });
      let called = false;
      forEach((v, k) => {
        called = true;
        switch (k) {
          case 'a': strictEqual(v, 1); break;
          case 'b': strictEqual(v, 2); break;
          case 'c': strictEqual(v, 3); break;
          default: throw new Error(`unexpected key`);
        }
      }, map);
      strictEqual(called, true);
    });
  });

  describe('map()', () => {
    it('should map all values into a new hashmap', () => {
      const o = fromObject<string, number>({ a: 1, b: 2, c: 3 });
      const n = mapmap((v, k) => v * 2, o);
      notStrictEqual(o, n);
      deepStrictEqual(toObject(n), { a: 2, b: 4, c: 6 });
    });
  });

  describe('filter()', () => {
    it('should filter all values into a new hashmap', () => {
      const o = fromObject<string, number>({ a: 1, b: 2, c: 3 });
      const n = filter((v, k) => v % 2 === 0, o);
      notStrictEqual(o, n);
      deepStrictEqual(toObject(n), { b: 2 });
    });
  });

  describe('reduce()', () => {
    it('should reduce all values', () => {
      const map = fromObject<string, number>({ a: 1, b: 2, c: 3 });
      const res = reduce((a, v, k) => a + v, 0, map);
      strictEqual(res, 6);
    });
  });

});
