import { Image, List, Typography } from "antd";
import { FC, ReactNode } from "react";

import { getItemNames } from "../../helpers/formatting";

import "./style.scss";

interface IObjectStrings {
  [key: string]: string;
}

interface IItemViewer {
  item: object | null;
  keyToLabelMap: IObjectStrings;
}

const ItemViewer: FC<IItemViewer> = ({ item, keyToLabelMap }) => {
  if (!item) return null;

  const dataSource = Object.keys(keyToLabelMap).map((key) => [
    key,
    (item as IObjectStrings)[key],
  ]);

  return (
    <List
      className="view-container"
      header={
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Movie Details
        </Typography.Title>
      }
      bordered
      dataSource={dataSource}
      renderItem={(itemValue) => {
        const [key, value] = itemValue as any[];
        let renderItem: string | ReactNode = value ?? "---";

        if (key === "poster")
          renderItem = <Image src={itemValue[1]} width={200} />;
        if (typeof value === "boolean") renderItem = value.toString();
        if (Array.isArray(value)) {
          const renderValue =
            value.length && value[0]?.name ? getItemNames(value) : value;

          renderItem = renderValue.length ? (
            <ul>
              {renderValue.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            "---"
          );
        }

        return (
          <List.Item className="list-view" key={key}>
            <div className="list-view__label">{keyToLabelMap[key] || key}</div>
            <div className="list-view__value">{renderItem}</div>
          </List.Item>
        );
      }}
    />
  );
};

export default ItemViewer;
