import { deepStrictEqual as eq } from 'assert';
import { stringHash } from '../src/common/stringHash';

describe('hashGenerator', () => {
  it('generates 32 bit hash from string', () => {
    const str = 'hello';

    eq(stringHash(str), 99162322);
  });
});
