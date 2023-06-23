import { FC, useMemo, useState, useRef, useEffect } from "react";
import {
  Button,
  Divider,
  Input,
  InputRef,
  Select,
  SelectProps,
  Space,
  Spin,
} from "antd";
import debounce from "lodash/debounce";
import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";
import { convertName } from "../../helpers/formatting";

interface IOption {
  label: string | React.ReactNode;
  value: string;
}

interface IOptionResponse {
  data: any[];
}

interface IItemResponse {
  item: IItem;
  message?: string;
}

interface IItem {
  _id: string;
}

interface ISearchSelect extends SelectProps {
  searchBy: string;
  fetchOptions: (search: any) => Promise<IOptionResponse>;
  name?: string;
  addItem?: (item: any) => Promise<IItemResponse>;
  debounceTimeout?: number;
}

const SearchSelect: FC<ISearchSelect> = ({
  fetchOptions,
  addItem,
  searchBy,
  name = "item",
  debounceTimeout = 800,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const fetchRef = useRef(0);
  const inputRef = useRef<InputRef>(null);

  const convertToOptions = (items: any[]): IOption[] => {
    return items.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  };

  const loadOptions = async (value: string | null, isInitial?: boolean) => {
    // @ts-ignore
    fetchRef.current += 1;
    const fetchId = fetchRef.current;
    setOptions(initialData);
    setLoading(true);

    if (!isInitial && !value) return setLoading(false);
    const searchParams = {
      [searchBy]: value,
    };

    const requestParams = isInitial
      ? {
          pagination: {
            pageSize: 10,
          },
        }
      : { search: searchParams };

    const { data } = await fetchOptions(requestParams);

    if (fetchId !== fetchRef.current) {
      // for fetch callback order
      return;
    }

    const convertedData = convertToOptions(data);

    if (isInitial) {
      setInitialData(convertedData);
    }
    setOptions(convertedData);
    setLoading(false);
  };

  useEffect(() => {
    loadOptions(null, true);
  }, []);

  const debounceFetcher = useMemo(
    () => debounce(loadOptions, debounceTimeout),
    [fetchOptions, debounceTimeout]
  );

  const resetOptions = () => {
    setNewItem("");
    setOptions(initialData);
  };

  const onNewItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const onAddNewItem = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (addItem) {
      setLoading(true);
      const { item } = await addItem(convertName(newItem));
      const convertedItem = {
        //@ts-ignore
        label: item[searchBy],
        value: item._id,
      };

      setOptions((prev) => [convertedItem, ...prev]);
      setNewItem("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      setLoading(false);
    }
  };

  const selectFooter = (menu: React.ReactElement) => (
    <>
      {menu}
      <Divider style={{ margin: "8px 0" }} />
      <Space style={{ padding: "0 8px 4px" }}>
        <Input
          placeholder={`Please enter new ${name}`}
          ref={inputRef}
          value={newItem}
          onChange={onNewItemChange}
        />
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={onAddNewItem}
          disabled={!newItem}
        >
          Add {name}
        </Button>
      </Space>
    </>
  );

  const notFoundContent = loading ? (
    <div className="spinner-container">
      <Spin size="small" />
    </div>
  ) : (
    <div className="not-found-container">
      The {name} has not been found. <br />
      {addItem ? "You can add a new one!" : null}
    </div>
  );

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={notFoundContent}
      {...props}
      options={options}
      dropdownRender={selectFooter}
      onDropdownVisibleChange={resetOptions}
    />
  );
};

export default SearchSelect;
