import { FC, useMemo } from "react";
import { Tooltip } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import "./style.scss";

interface ICollapseButton {
  isActive: boolean;
  onClick: (value: boolean) => void;
  tooltipMessage?: string;
}

const CollapseButton: FC<ICollapseButton> = ({
  isActive,
  tooltipMessage,
  onClick,
}) => {
  const arrowIcon = useMemo(() => {
    if (isActive)
      return <ArrowDownOutlined className="collapse-button__arrow-icon" />;
    return <ArrowUpOutlined className="collapse-button__arrow-icon" />;
  }, [isActive]);

  const clickHandler = () => onClick(!isActive);

  if (!tooltipMessage || isActive)
    return (
      <div className="collapse-button" onClick={clickHandler}>
        {arrowIcon}
      </div>
    );

  return (
    <Tooltip placement="top" title={tooltipMessage} arrow>
      <div className="collapse-button" onClick={clickHandler}>
        {arrowIcon}
      </div>
    </Tooltip>
  );
};

export default CollapseButton;
