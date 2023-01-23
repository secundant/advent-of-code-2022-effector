import { fork } from 'effector';
import { describe, expect, test } from 'vitest';
import { max } from '@/shared/math';
import { fromLength, length } from '@/shared/std';
import { getDayData } from '@/shared/testing-utils';
import {
  $commands,
  $reorderedMask,
  $reorderedStacks,
  $reorderedWithNewCrateMask,
  $stacks
} from '@/solutions/day-05/solution';

const exampleData = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const stacksIsEq = (actual: string[][], expected: string[][]) =>
  expect(actual).toEqual(expected.map(stack => stack.map(name => `[${name}]`)));

describe('Day 04', async () => {
  const createScope = (data: string) => {
    const [stacksInputWithLegend, commandsInput] = data.split('\n\n');
    const stacksInputs = stacksInputWithLegend.split('\n').slice(0, -1);
    const stacksLength = (max(stacksInputs.map(length)) + 1) / 4;
    const stacks = fromLength(stacksLength, x =>
      fromLength(stacksInputs.length, y =>
        stacksInputs[stacksInputs.length - 1 - y].slice(x * 4, x * 4 + 3).trim()
      ).filter(Boolean)
    );

    const commands = commandsInput
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const [_, size, from, to] = line.match(/move ([0-9]*) from ([0-9]*) to ([0-9]*)/)!;

        return {
          size: Number.parseInt(size, 10),
          from: Number.parseInt(from, 10) - 1,
          to: Number.parseInt(to, 10) - 1
        };
      });

    return fork({
      values: [
        [$stacks, stacks],
        [$commands, commands]
      ]
    });
  };

  test('01 - should pass example', () => {
    const scope = createScope(exampleData);

    expect(scope.getState($reorderedMask)).toEqual('CMZ');
    stacksIsEq(scope.getState($reorderedStacks), [['C'], ['M'], ['P', 'D', 'N', 'Z']]);
  });

  test('01 - After the rearrangement procedure completes, what crate ends up on top of each stack?', async () => {
    const scope = createScope(await getDayData(5));

    expect(scope.getState($reorderedStacks)).toMatchSnapshot();
    expect(scope.getState($reorderedMask)).toMatchSnapshot();
  });

  test('02 - should pass example', () => {
    const scope = createScope(exampleData);

    expect(scope.getState($reorderedWithNewCrateMask)).toEqual('MCD');
  });

  test('02 - After the rearrangement procedure completes, what crate ends up on top of each stack?', async () => {
    const scope = createScope(await getDayData(5));

    expect(scope.getState($reorderedWithNewCrateMask)).toMatchSnapshot();
  });
});
