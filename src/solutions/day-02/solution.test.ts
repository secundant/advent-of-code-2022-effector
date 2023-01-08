import { fork } from 'effector';
import { describe, expect, test } from 'vitest';
import { readRelativeFile } from '@/shared/fs';
import { $encryptedRounds, $totalScore } from '@/solutions/day-02/solution';

describe('Day 2', () => {
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

  test('should pass example', () => {
    expect(
      createScope(`A Y
B X
C Z`).getState($totalScore)
    ).toBe(15);
  });

  test('01 - total score be if everything goes exactly according to your strategy guide', async () => {
    const scope = await createScopeWithData();

    expect(scope.getState($totalScore)).toMatchSnapshot();
  });
});
