import { ITableParams } from "../interfaces/params.interface";

const serialize = (params?: ITableParams) => {
  if (typeof params === "undefined") {
    return "";
  }

  const query: string[] = [];
  const paramsKey = Object.keys(params);

  if (!!paramsKey.length) {
    // pagination
    if (params.pagination) {
      const { current, pageSize } = params.pagination;
      query.push(`offset=${current || 1}`);
      query.push(`limit=${pageSize}`);
    }

    // sort
    if (params.sort) {
      const { field, order } = params.sort;
      query.push(`sort[${field}]=${order}`);
    }

    // filter
    if (params.filter) {
      const filterKeys = Object.keys(params.filter);
      filterKeys.forEach((key) => {
        const filterValues = params.filter?.[key]!;
        query.push(`filter[${key}]=${filterValues.join(",")}`);
      });
    }

    // search
    if (params.search) {
      const searchKeys = Object.keys(params.search);
      searchKeys.forEach((key) => {
        const searchValue = params.search?.[key]!;
        query.push(`search[${key}]=${searchValue}`);
      });
    }

    return query.join("&");
  }

  return "";
};

export default serialize;
