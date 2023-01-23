import { combine, createStore } from 'effector';

export interface MoveCommand {
  size: number;
  from: number;
  to: number;
}

const move = (stacks: string[][], { to, size, from }: MoveCommand) => {
  stacks[to].push(...stacks[from].splice(stacks[from].length - size).reverse());
};

export const $stacks = createStore<string[][]>([], { sid: '$stacks' });
export const $commands = createStore<MoveCommand[]>([], { sid: '$commands' });

export const $reorderedStacks = combine($stacks, $commands, (stacks, commands) =>
  commands.reduce(
    (acc, command) => {
      move(acc, command);
      return acc;
    },
    Array.from(stacks, stack => Array.from(stack))
  )
);

export const $reorderedTopCrates = $reorderedStacks.map(stacks =>
  stacks.map(stack => stack.at(-1))
);
export const $reorderedMask = $reorderedTopCrates.map(chars =>
  chars
    .filter(Boolean)
    .map(crateName => crateName!.slice(1, 2))
    .join('')
);
