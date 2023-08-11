import { TablePaginationConfig } from "antd";
import { ISortTypes } from "../components/ui/button/button.sort";

export interface ISort {
  field: string;
  order: ISortTypes;
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
