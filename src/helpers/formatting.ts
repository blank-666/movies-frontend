const capitalizeFirstLetter = (string: string) =>
  string[0].toUpperCase() + string.substring(1);

const convertName = (name: string) =>
  name.split(" ").map(capitalizeFirstLetter).join(" ");

const getSelectOptions = (arr: any = []) =>
  arr.map((val: string | number) => ({
    label: capitalizeFirstLetter(val.toString()),
    value: val.toString(),
  }));

export { capitalizeFirstLetter, getSelectOptions, convertName };
