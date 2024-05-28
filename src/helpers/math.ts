export const calcTotal = (data: Array<number>) => {
  const result = data.reduce((total, item) => total + item, 0);
  return result;
};
