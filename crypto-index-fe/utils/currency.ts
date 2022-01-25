export const exactRound = (num: string, decimals: number) => {
  const index = num.indexOf(".");
  if (index > -1) {
    const lastIndex = index + decimals + 1;
    return num.substring(0, lastIndex);
  }

  return num;
};
