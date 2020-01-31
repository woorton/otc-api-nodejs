import debug from 'debug';

export const log = debug('woorton:log');
log.log = console.log.bind(console);

export const error = debug('woorton:error');
error.log = console.error.bind(console);
