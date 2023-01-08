import { sum } from '@/shared/math';
import { chunk, uniq } from '@/shared/std';
import { $rucksacks, getPriority } from '@/solutions/day-03/solution';

const elvesInGroup = 3;
const countOccurrencesReducer = <T extends string>(acc: Record<T, number>, items: T[]) => {
  items.forEach(value => {
    acc[value] ??= 0;
    acc[value]++;
  });
  return acc;
};

export const $badgesTotalPriorities = $rucksacks
  .map(rucksacks => chunk(rucksacks.map(rucksack => rucksack.flat()).map(uniq), elvesInGroup))
  .map(groups =>
    groups
      .map(rucksacks => {
        const stats = rucksacks.reduce(countOccurrencesReducer, {});
        const candidateEntry = Object.entries(stats).find(([_, count]) => count === elvesInGroup);

        return candidateEntry![0];
      })
      .map(getPriority)
  )
  .map(sum);
