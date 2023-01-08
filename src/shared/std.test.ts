import { expect, test } from 'vitest';
import { chunk } from '@/shared/std';

test('chunk', () => {
  expect(chunk('abcd', 2)).toEqual(['ab', 'cd']);
  expect(chunk('aabbccdd', 3)).toEqual(['aab', 'bcc', 'dd']);
  expect(chunk([1, 1, 2, 2], 2)).toEqual([
    [1, 1],
    [2, 2]
  ]);
  expect(chunk([1, 1, 2, 2, 3, 3], 3)).toEqual([
    [1, 1, 2],
    [2, 3, 3]
  ]);
});
