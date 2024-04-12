export const isEmptyString = (str: string) => {
  if (str === '<p></p>') return true;
  return str.trim().length === 0;
};
