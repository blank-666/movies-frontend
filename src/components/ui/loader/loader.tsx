import { Spin } from "antd";
import { FC } from "react";

import "./style.scss";

const Loader: FC = () => (
  <div className="loader-container">
    <Spin />
  </div>
);

export default Loader;
