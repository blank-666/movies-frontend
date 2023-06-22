import { FC, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, InputRef, Select, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";

interface ISelectWithAdd {
  options: DefaultOptionType[];
}

const SelectWithAdd: FC<ISelectWithAdd> = ({ options }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const [selectOptions, setSelectOptions] = useState<DefaultOptionType[]>([]);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setSelectOptions(options);
  }, [options]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const newOption = { label: newItem, value: newItem };
    setSelectOptions((prev) => [...prev, newOption]);
    setSelectedValues((prev) => [...prev, newItem]);
    setNewItem("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSelectChange = (value: string[]) => setSelectedValues(value);

  const dropdownFooter = (
    menu: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  ) => (
    <>
      {menu}
      <Divider style={{ margin: "8px 0" }} />
      <Space style={{ padding: "0 8px 4px" }}>
        <Input
          placeholder="Please enter item"
          ref={inputRef}
          value={newItem}
          onChange={onInputChange}
        />
        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
          Add item
        </Button>
      </Space>
    </>
  );

  return (
    <Select
      value={selectedValues}
      onChange={handleSelectChange}
      mode="multiple"
      options={selectOptions}
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? "")
          .toString()
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      dropdownRender={dropdownFooter}
    />
  );
};

export default SelectWithAdd;
