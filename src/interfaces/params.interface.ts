import { TablePaginationConfig } from "antd";

export interface ISort {
  field: string;
  order: string;
}

export interface IFilters {
  [name: string]: string[];
}

export interface ISearch {
  [name: string]: string;
}

export interface ITableParams {
  pagination: TablePaginationConfig;
  sort?: ISort;
  filter?: IFilters;
  search?: ISearch;
}
