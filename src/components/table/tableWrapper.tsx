import { FC, ReactNode } from "react";

import { Card } from "antd";

interface ITableWrapper {
  children: ReactNode;
}

const TableWrapper: FC<ITableWrapper> = ({ children }) => (
  <Card style={{ width: "100%", overflowX: "auto" }}>{children}</Card>
);

export default TableWrapper;
