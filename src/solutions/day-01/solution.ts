import { createEvent, createStore, sample } from 'effector';
import { sum } from '@/shared/math';
import { last, numericComparator, sort } from '@/shared/std';

const countOfElvesCarryingTheMostCalories = 3;

export const replaceCalories = createEvent<number[][]>();

const $rawCaloriesGroups = createStore<number[][]>([]);

const $calories = $rawCaloriesGroups.map(groups => groups.map(sum));
const $sortedCalories = $calories.map(calories => sort(calories, numericComparator));

export const $sumOfTopCalories = $sortedCalories.map(calories =>
  sum(calories.slice(-1 * countOfElvesCarryingTheMostCalories))
);
export const $maxCalories = $sortedCalories.map(last);

sample({
  clock: replaceCalories,
  target: $rawCaloriesGroups
});
