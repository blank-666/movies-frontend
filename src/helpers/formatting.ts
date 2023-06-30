import dayjs from "dayjs";
import { IObjectWithName } from "../interfaces/movies.interface";

const capitalizeFirstLetter = (string: string) =>
  string[0].toUpperCase() + string.substring(1);

const convertName = (name: string) =>
  name.split(" ").map(capitalizeFirstLetter).join(" ");

const getSelectOptions = (arr: any = []) =>
  arr.map((val: string | number) => ({
    label: capitalizeFirstLetter(val.toString()),
    value: val.toString(),
  }));

const convertToFormData = (values: any) => {
  const data = new FormData();
  const valuesKeys = Object.keys(values);
  const isSelectOption = (val: any[]) => val.some((v) => v?.label && v?.value);

  for (const key of valuesKeys) {
    const value = values[key];

    if (!value) continue;

    // convert year field from dayjs format to string
    if (key === "year") data.append(key, String(dayjs(value).year()));
    // convert array of selected options to array of ids
    else if (Array.isArray(value) && isSelectOption(value)) {
      data.append(key, value.map((v) => v.value).join(","));
    }
    // convert file
    else if (value?.originFileObj) {
      data.append(key, value.originFileObj);
    } else data.append(key, values[key]);
  }

  return data;
};

const convertYearToDayJS = (year: number) => {
  return dayjs().year(year);
};

const getItemNames = (array: IObjectWithName[]) => {
  return array.map((val) => val.name);
};

const convertToSelectOptions = (array: IObjectWithName[]) =>
  array.map((item) => ({
    label: item.name,
    value: item._id,
  }));

const parseFileForSetFields = (url: string, options = {}) => {
  return url
    ? {
        uid: "-1",
        name: url,
        status: "done",
        url: url,
        key: url,
        ...options,
      }
    : null;
};

export {
  capitalizeFirstLetter,
  getSelectOptions,
  convertName,
  convertToFormData,
  convertYearToDayJS,
  getItemNames,
  convertToSelectOptions,
  parseFileForSetFields,
};
