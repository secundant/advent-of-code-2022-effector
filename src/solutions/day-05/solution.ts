import { combine, createStore } from 'effector';

export interface MoveCommand {
  size: number;
  from: number;
  to: number;
}

const move = (stacks: string[][], { to, size, from }: MoveCommand) => {
  stacks[to].push(...stacks[from].splice(stacks[from].length - size).reverse());
};
const moveNewCrate = (stacks: string[][], { to, size, from }: MoveCommand) => {
  stacks[to].push(...stacks[from].splice(stacks[from].length - size));
};

const createCrate =
  (tick: (stacks: string[][], command: MoveCommand) => void) =>
  (stacks: string[][], commands: MoveCommand[]) =>
    commands.reduce(
      (acc, command) => {
        tick(acc, command);
        return acc;
      },
      Array.from(stacks, stack => Array.from(stack))
    );

const getMask = (stacks: string[][]) =>
  stacks
    .map(stack => stack.at(-1))
    .filter(Boolean)
    .map(crateName => crateName!.slice(1, 2))
    .join('');

export const $stacks = createStore<string[][]>([], { sid: '$stacks' });
export const $commands = createStore<MoveCommand[]>([], { sid: '$commands' });

export const $reorderedStacks = combine($stacks, $commands, createCrate(move));

export const $reorderedWithNewCrateStacks = combine($stacks, $commands, createCrate(moveNewCrate));

export const $reorderedMask = $reorderedStacks.map(getMask);
export const $reorderedWithNewCrateMask = $reorderedWithNewCrateStacks.map(getMask);
