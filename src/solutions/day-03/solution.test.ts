import { fork } from 'effector';
import { describe, expect, test } from 'vitest';
import { createTestContext } from '@/shared/testing-utils';
import { $encryptedRucksacks, $failedItemsTotalPriority } from '@/solutions/day-03/solution';

describe('Day 3', () => {
  const exampleData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
  const ctx = createTestContext(import.meta);
  const createScope = (data: string) =>
    fork({
      values: [[$encryptedRucksacks, data.trim().split('\n')]]
    });

  test('01 - should pass example', () => {
    expect(createScope(exampleData).getState($failedItemsTotalPriority)).toBe(157);
  });

  test('01 - sum of the priorities of items that appears in both compartments of each rucksack', async () => {
    expect(createScope(await ctx.loadFile()).getState($failedItemsTotalPriority)).toMatchSnapshot();
  });
});
