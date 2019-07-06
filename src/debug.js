// eslint-disable-next-line no-console
export const log = (...text) => process.env.NODE_ENV !== 'production' && console.log(text);
// eslint-disable-next-line no-console
export const warn = (...text) => process.env.NODE_ENV !== 'production' && console.warn(text);
// eslint-disable-next-line no-console
export const error = (...text) => process.env.NODE_ENV !== 'production' && console.error(text);
