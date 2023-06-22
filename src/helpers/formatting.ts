const capitalizeFirstLetter = (word: string) => {
  const firstLetter = word.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = word.slice(1);

  return firstLetterCap + remainingLetters;
};

// const getSelectOptions = (arr?: string[] | number[]) =>
//   arr.map((val) => ({ label: val.toString(), value: val.toString() }));

const getSelectOptions = (arr: any = []) =>
  arr.map((val: string | number) => ({
    label: capitalizeFirstLetter(val.toString()),
    value: val.toString(),
  }));

export { capitalizeFirstLetter, getSelectOptions };
