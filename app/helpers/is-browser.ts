export const isBrowser = (() =>
  typeof globalThis !== "undefined" &&
  typeof HTMLElement !== "undefined" &&
  Boolean(globalThis.document) &&
  String(HTMLElement).includes("[native code]"))();
