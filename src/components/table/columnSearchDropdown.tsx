import { Button, Input, InputRef, Space } from "antd";
import { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";

import { FC, forwardRef, useState } from "react";

export interface IFilterDropdownProps {
  dataIndex: string;
  selectedKeys: string[];
  setSelectedKeys: (keys: any) => void;
  confirm: (field: string, value?: string) => void;
  clearFilters: () => void;
  close: () => void;
}

const ColumnSearchDropdown = forwardRef<InputRef, IFilterDropdownProps>(
  (
    { dataIndex, selectedKeys, setSelectedKeys, confirm, clearFilters, close },
    ref
  ) => {
    const [searchText, setSearchText] = useState<string>("");

    console.log("---", selectedKeys);

    const handleSearch = (selectedKeys: string[], dataIndex: string) => {
      confirm(dataIndex, selectedKeys[0]);
      setSearchText(selectedKeys[0]);
      close();
      // setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      confirm(dataIndex);
      close();
      setSearchText("");
    };

    return (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={ref}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys as string[], dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    );
  }
);

export default ColumnSearchDropdown;
