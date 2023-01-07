import { allSettled, fork } from 'effector';
import { readFile } from 'node:fs/promises';
import { expect, test } from 'vitest';
import { $maxCalories, elvesWroteNewStatistics } from '@/puzzles/01-elves-calories/solution';
import { metaResolve } from '@/shared/path';

test('should calc max calories', async () => {
  const scope = fork();

  await allSettled(elvesWroteNewStatistics, {
    scope,
    params: await readFile(metaResolve(import.meta, 'data.txt'), 'utf-8')
  });

  expect(scope.getState($maxCalories)).toMatchSnapshot();
});
