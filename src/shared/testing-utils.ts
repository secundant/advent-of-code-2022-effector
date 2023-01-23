import { readFile } from 'node:fs/promises';

export const createTestContext = (meta: ImportMeta) => {
  const loadFile = (name = './data.txt') => readFile(new URL(name, meta.url).pathname, 'utf-8');

  return {
    loadFile
  };
};

export const getData = (name: string) =>
  readFile(new URL(`../data/${name}`, import.meta.url).pathname, 'utf-8');
export const getDayData = (day: number | string) => getData(`day-${day}.txt`);
