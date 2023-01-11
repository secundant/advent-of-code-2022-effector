import { createStore } from 'effector';
import { toInt } from '@/shared/std';

type SerializedPair = [string, string];
type Range = [number, number];

const parseRange = (input: string) => input.split('-').map(toInt) as [number, number];
const parsePair = (pair: SerializedPair) => pair.map(parseRange) as [Range, Range];

const inRange = (value: number, [from, to]: Range) => value >= from && value <= to;
const isSubRange = (range: Range, subRange: Range) =>
  subRange.every(value => inRange(value, range));

const isOverlappingRange = (range: Range, subRange: Range) =>
  subRange.some(value => inRange(value, range));

const isFullyOverlappingPair = ([left, right]: [Range, Range]) =>
  isSubRange(left, right) || isSubRange(right, left);

const isPartiallyOverlappedPair = ([left, right]: [Range, Range]) =>
  isOverlappingRange(left, right) || isOverlappingRange(right, left);

export const $serializedPairs = createStore<SerializedPair[]>([], { sid: '$serializedPairs' });

export const $pairs = $serializedPairs.map(pairs => pairs.map(parsePair));

export const $fullyOverlappedPairs = $pairs.map(pairs => pairs.filter(isFullyOverlappingPair));

export const $anyOverlappedPairs = $pairs.map(pairs => pairs.filter(isPartiallyOverlappedPair));
