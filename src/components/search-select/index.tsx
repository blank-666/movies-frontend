import { FC, useMemo, useState, useRef, useEffect } from "react";
import { Select, SelectProps, Spin } from "antd";
import debounce from "lodash/debounce";

interface IOption {
  label: string | React.ReactNode;
  value: string;
}

interface IResponse {
  data: any[];
}

interface ISearchSelect extends SelectProps {
  searchBy: string;
  fetchOptions: (search: any) => Promise<IResponse>;
  debounceTimeout?: number;
}

const SearchSelect: FC<ISearchSelect> = ({
  fetchOptions,
  searchBy,
  debounceTimeout = 800,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const fetchRef = useRef(0);

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

  const resetOptions = () => setOptions(initialData);

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={loading ? <Spin size="small" /> : null}
      {...props}
      options={options}
      onBlur={resetOptions}
    />
  );
};

export default SearchSelect;
