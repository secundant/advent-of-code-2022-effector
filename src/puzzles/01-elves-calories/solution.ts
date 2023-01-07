import { createEvent, createStore, sample } from 'effector';
import { max, sum } from '@/shared/math';

export const elvesWroteNewStatistics = createEvent<string>();

const $detailedCalories = createStore<number[][]>([]);

export const $maxCalories = $detailedCalories.map(stats => max(stats.map(sum)));

sample({
  clock: elvesWroteNewStatistics.map(text =>
    text
      .trim()
      .split('\n\n')
      .map(chunk => chunk.split('\n').map(line => Number.parseInt(line, 10)))
  ),
  target: $detailedCalories
});
