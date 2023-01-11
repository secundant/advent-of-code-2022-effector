import { fork } from 'effector';
import { describe, expect, test } from 'vitest';
import { createTestContext } from '@/shared/testing-utils';
import { $fullyOverlappedPairs, $serializedPairs } from '@/solutions/day-04/solution';

const exampleData = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

describe('Day 04', async () => {
  const ctx = createTestContext(import.meta);
  const createScope = (data: string) =>
    fork({
      values: [
        [
          $serializedPairs,
          data
            .trim()
            .split('\n')
            .map(line => line.split(','))
        ]
      ]
    });

  test('01 - should pass example', () => {
    expect(createScope(exampleData).getState($fullyOverlappedPairs)).toHaveLength(2);
  });

  test('01 - In how many assignment pairs does one range fully contain the other?', async () => {
    expect(
      createScope(await ctx.loadFile()).getState($fullyOverlappedPairs).length
    ).toMatchSnapshot();
  });
});
