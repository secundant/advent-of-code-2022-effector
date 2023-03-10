import { allSettled, fork } from 'effector';
import { describe, expect, test } from 'vitest';
import { readRelativeFile } from '@/shared/fs';
import { $maxCalories, $sumOfTopCalories, replaceCalories } from '@/solutions/day-01/solution';

describe('Day 1', async () => {
  const createAndFillScope = async () => {
    const scope = fork();
    const data = await readRelativeFile(import.meta, './data.txt');

    await allSettled(replaceCalories, {
      scope,
      params: data
        .trim()
        .split('\n\n')
        .map(chunk => chunk.split('\n').map(line => Number.parseInt(line, 10)))
    });

    return scope;
  };

  test('01 - how many Calories are being carried by the Elf carrying the most Calories', async () => {
    const scope = await createAndFillScope();

    expect(scope.getState($maxCalories)).toMatchSnapshot();
  });

  test('02 - total Calories carried by the top three Elves carrying the most Calories', async () => {
    const scope = await createAndFillScope();

    expect(scope.getState($sumOfTopCalories)).toMatchSnapshot();
  });
});
