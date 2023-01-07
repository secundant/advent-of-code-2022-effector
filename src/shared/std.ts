export type Comparator<T> = (left: T, right: T) => number;

// eslint-disable-next-line @typescript-eslint/require-array-sort-compare
export const sort = <T>(list: T[], comparator?: Comparator<T>) => Array.from(list).sort(comparator);

export const numericComparator = (a: number, b: number) => a - b;

export const last = <T>(list: T[]) => list.at(-1);
