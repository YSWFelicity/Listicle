import { fileURLToPath } from 'node:url';

export const publicDirectory = fileURLToPath(new URL('../../client/public/', import.meta.url));
export const pagesDirectory = fileURLToPath(new URL('../../client/pages/', import.meta.url));
export const picoDirectory = fileURLToPath(new URL('../../node_modules/@picocss/pico/css/', import.meta.url));
