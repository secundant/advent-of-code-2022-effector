import { readFile } from 'node:fs/promises';

export const createTestContext = (meta: ImportMeta) => {
  const loadFile = (name = './data.txt') => readFile(new URL(name, meta.url).pathname, 'utf-8');

  return {
    loadFile
  };
};
