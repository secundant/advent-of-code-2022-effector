export type Comparator<T> = (left: T, right: T) => number;

// eslint-disable-next-line @typescript-eslint/require-array-sort-compare
export const sort = <T>(list: T[], comparator?: Comparator<T>) => Array.from(list).sort(comparator);

export const numericComparator = (a: number, b: number) => a - b;

export const last = <T>(list: T[]) => list.at(-1);
export const uniq = <T>(list: T[]) => Array.from(new Set(list));

export const divideString = (input: string, length: number) =>
  Array.from({ length }, (_, index) => input.slice(index * length, (index + 1) * length));

export const isUpperCase = (char: string) => char === char.toUpperCase();

export const getCharCode = (char: string) => char.charCodeAt(0);

export function chunk(input: string, size: number): string[];
export function chunk<T>(input: T[], size: number): T[][];
export function chunk<T>(input: string | T[], size: number) {
  return Array.from({ length: Math.ceil(input.length / size) }, (_, index) =>
    input.slice(index * size, (index + 1) * size)
  );
}
