import { readFile } from 'node:fs/promises';

export const readRelativeFile = (meta: ImportMeta, path: string) =>
  readFile(new URL(path, meta.url).pathname, 'utf-8');
