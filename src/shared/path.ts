import { resolve } from 'node:path';

export const metaDirname = (meta: ImportMeta) => new URL('.', meta.url).pathname;
export const metaResolve = (meta: ImportMeta, ...paths: string[]) =>
  resolve(metaDirname(meta), ...paths);
