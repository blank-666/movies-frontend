import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import SideMenu from "../sider";

import "./style.scss";

const PageLayout: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Layout className="app-layout">
      <Sider
        className="app-layout__sider"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <SideMenu />
      </Sider>
      <Layout>
        <Header className="app-layout__header">
          <Typography.Title level={3} style={{ margin: 0 }}>
            Movies App
          </Typography.Title>
        </Header>
        <Content className="app-layout__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
