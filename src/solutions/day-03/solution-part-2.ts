import { sum } from '@/shared/math';
import { chunk } from '@/shared/std';
import { $encryptedRucksacks, getPriority } from '@/solutions/day-03/solution';

const elvesInGroup = 3;

export const $badgesTotalPriorities = $encryptedRucksacks
  .map(rucksacks =>
    chunk(rucksacks, elvesInGroup)
      .map(
        ([first, ...other]) =>
          Array.from(first).find(char => other.every(rucksack => rucksack.includes(char)))!
      )
      .map(getPriority)
  )
  .map(sum);
