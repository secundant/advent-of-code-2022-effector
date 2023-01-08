import { fork } from 'effector';
import { describe, expect, test } from 'vitest';
import { readRelativeFile } from '@/shared/fs';
import { $encryptedRounds, $totalScore } from '@/solutions/day-02/solution';
import { $restoredTotalScore } from '@/solutions/day-02/solution-part-2';

describe('Day 2', () => {
  const exampleData = `A Y
B X
C Z`;
  const createScope = (data: string) =>
    fork({
      values: [
        [
          $encryptedRounds,
          data
            .trim()
            .split('\n')
            .map(line => line.split(' '))
        ]
      ]
    });
  const createScopeWithData = async () =>
    createScope(await readRelativeFile(import.meta, './data.txt'));

  test('01 - should pass example', () => {
    expect(createScope(exampleData).getState($totalScore)).toBe(15);
  });

  test('01 - total score be if everything goes exactly according to your strategy guide', async () => {
    const scope = await createScopeWithData();

    expect(scope.getState($totalScore)).toMatchSnapshot();
  });

  test('02 - should pass example', () => {
    expect(createScope(exampleData).getState($restoredTotalScore)).toBe(12);
  });

  test('02 - what would your total score be if everything goes exactly according to your strategy guide?', async () => {
    const scope = await createScopeWithData();

    expect(scope.getState($restoredTotalScore)).toMatchSnapshot();
  });
});
