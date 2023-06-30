import {
  FC,
  Key,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  InputRef,
  Table as AntdTable,
  TablePaginationConfig,
  Space,
  Button,
  Popconfirm,
} from "antd";
import {
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import _ from "lodash";
import { ITableParams } from "../../interfaces/params.interface";
import ColumnSearchDropdown, {
  IFilterDropdownProps,
} from "./columnSearchDropdown";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { LoadingContext } from "../../context/loading.context";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

interface IColumn {
  [key: string]: any;
}

interface IRowSelection {
  selectedRowKeys: Key[];
  onChange: (selectedRowKeys: Key[], selectedRows: object[]) => void;
}

interface ITable {
  data: object[];
  columns: IColumn[];
  rowSelection?: IRowSelection;
  refetch?: boolean;
  actionsColumn?: boolean;
  onDeleteItem?: (ids: string[]) => Promise<any>;
  onEndRefetch?: () => void;
  getDataAction: (params: any) => Promise<any>;
  onReceivingData: (data: object[]) => void;
}

const Table: FC<ITable> = ({
  data,
  columns,
  rowSelection,
  refetch,
  actionsColumn,
  onDeleteItem,
  onEndRefetch,
  getDataAction,
  onReceivingData,
}) => {
  const [totalCount, setTotalCount] = useState<number>();
  const [tableParams, setTableParams] = useState<ITableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isLoading, setLoading } = useContext(LoadingContext);

  const searchInputRef = useRef<InputRef>(null);

  useEffect(() => {
    fetchTableData();
  }, [JSON.stringify(tableParams)]);

  useEffect(() => {
    if (refetch) fetchTableData();
  }, [refetch]);

  const handleTableSearch = (field: string, value?: string) => {
    if (!value) {
      // reset search field
      setTableParams((prev) => {
        const searchClone = { ...prev.search };
        delete searchClone[field];

        return {
          ...prev,
          search: searchClone,
          pagination: { ...prev.pagination, current: 1 },
        };
      });
    } else {
      setTableParams((prev) => ({
        ...prev,
        search: { ...prev.search, [field]: value },
        pagination: { ...prev.pagination, current: 1 },
      }));
    }
  };

  const addColumnSearch = (column: any): any => {
    const columnSearchActive = Object.hasOwn(
      tableParams?.search || {},
      column.dataIndex
    );

    return {
      ...column,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        clearFilters,
        close,
      }: IFilterDropdownProps) => (
        <ColumnSearchDropdown
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={handleTableSearch}
          clearFilters={clearFilters}
          close={close}
          dataIndex={column.dataIndex}
          ref={searchInputRef}
        />
      ),
      filterIcon: () => (
        <SearchOutlined
          style={{ color: columnSearchActive ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value: any, record: any) =>
        record[column.dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => searchInputRef.current?.select(), 100);
        }
      },
    };
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<any>,
    { action }: any
  ) => {
    let offset = pagination.current;

    if (action === "sort") {
      offset = 1;

      if (sorter.field && sorter.order) {
        const { field, order } = sorter;
        setTableParams((prev) => ({
          ...prev,
          sort: { field: field as string, order },
          pagination: { ...prev.pagination, current: offset },
        }));
      } else {
        setTableParams((prev) => {
          const newParams = {
            ...prev,
            pagination: { ...prev.pagination, current: offset },
          };
          delete newParams.sort;
          return newParams;
        });
      }
    }

    if (action === "filter") {
      offset = 1;

      if (!_.isEmpty(filters)) {
        const activeFilters: any = {};
        const filterKeys = Object.keys(filters);
        filterKeys.forEach((key) => {
          if (!!filters[key]) activeFilters[key] = filters[key];
          else delete activeFilters[key];
        });

        setTableParams((prev) => {
          const newParams = {
            ...prev,
            pagination: { ...prev.pagination, current: offset },
          };

          if (_.isEmpty(activeFilters)) delete newParams.filter;
          else newParams.filter = activeFilters;
          return newParams;
        });
      } else {
        setTableParams((prev) => {
          const newParams = { ...prev };
          delete newParams.filter;
          return newParams;
        });
      }
    }

    if (action === "paginate") {
      setTableParams((prev) => ({
        ...prev,
        pagination: { ...pagination, current: offset },
      }));
    }
  };

  const actionsColumnRender = {
    title: "Actions",
    dataIndex: "",
    key: "action",
    render: (_: any, record: any) => (
      <Space>
        <Button
          size="small"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => navigateToEditPage(record._id)}
        />

        {onDeleteItem ? (
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this item?"
            onConfirm={() => onDelete(record._id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button size="small" shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        ) : null}
      </Space>
    ),
  };

  const convertedColumns = useMemo((): any => {
    const columnsWithSearch = columns.map((column) => {
      if (column?.search) {
        return addColumnSearch(column);
      } else return column;
    });

    return actionsColumn
      ? [...columnsWithSearch, actionsColumnRender]
      : columnsWithSearch;
  }, [columns, actionsColumn]);

  const doubleClickOnRow = (record: object) => {
    // @ts-ignore
    if ("_id" in record) navigate(`${pathname}/view/${record._id!}`);
  };

  function navigateToEditPage(id: string) {
    navigate(`${pathname}/edit/${id}`);
  }

  async function onDelete(id: string) {
    await onDeleteItem!([id]);
  }

  async function fetchTableData() {
    setLoading(true);
    const { rows, total } = await getDataAction(tableParams);

    onReceivingData(rows);

    setTotalCount(total);
    setLoading(false);

    if (onEndRefetch) onEndRefetch();
  }

  return (
    <AntdTable
      className="table"
      dataSource={data}
      columns={convertedColumns}
      loading={isLoading}
      pagination={{
        ...tableParams.pagination,
        total: totalCount,
        showSizeChanger: true,
      }}
      rowSelection={rowSelection}
      // @ts-ignore
      onChange={handleTableChange}
      onRow={(record) => {
        return {
          onDoubleClick: () => doubleClickOnRow(record),
        };
      }}
    />
  );
};
export default Table;
