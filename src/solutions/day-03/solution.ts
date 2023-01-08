import { createStore } from 'effector';
import { sum } from '@/shared/math';
import { divideString, getCharCode, isUpperCase, uniq } from '@/shared/std';

export const compartmentsCount = 2;

export const getPriority = (char: string) =>
  isUpperCase(char)
    ? 27 + getCharCode(char) - getCharCode('A')
    : 1 + getCharCode(char) - getCharCode('a');

export const $encryptedRucksacks = createStore<string[]>([], { sid: '$encryptedRucksacks' });

export const $rucksacks = $encryptedRucksacks.map(encrypted =>
  encrypted.map(entry =>
    divideString(entry, entry.length / compartmentsCount).map(part => Array.from(part))
  )
);

export const $rucksacksErrors = $rucksacks.map(rucksacks =>
  rucksacks
    .map(([firstCompartment, ...otherCompartments]) =>
      firstCompartment.filter(itemCode =>
        otherCompartments.some(compartment => compartment.includes(itemCode))
      )
    )
    .map(uniq)
);

export const $failedItemsTotalPriority = $rucksacksErrors
  .map(rucksacks => rucksacks.map(rucksack => rucksack.map(getPriority)).map(sum))
  .map(sum);
