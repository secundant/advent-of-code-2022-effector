import { createStore } from 'effector';
import { toInt } from '@/shared/std';

type SerializedPair = [string, string];
type Range = [number, number];

const parseRange = (input: string) => input.split('-').map(toInt) as [number, number];
const parsePair = (pair: SerializedPair) => pair.map(parseRange) as [Range, Range];

const isRangeContains = (range: Range, subRange: Range) =>
  range[0] <= subRange[0] && range[1] >= subRange[1];

const isFullyOverlappedPair = ([left, right]: [Range, Range]) =>
  isRangeContains(left, right) || isRangeContains(right, left);

export const $serializedPairs = createStore<SerializedPair[]>([], { sid: '$serializedPairs' });

export const $pairs = $serializedPairs.map(pairs => pairs.map(parsePair));

export const $fullyOverlappedPairs = $pairs.map(pairs => pairs.filter(isFullyOverlappedPair));
