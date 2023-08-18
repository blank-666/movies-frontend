import { FC, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import SideMenu from "../sider";

import "./style.scss";

const PageLayout: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuthPage = useMemo(() => {
    return pathname === "/sign-in" || pathname === "/sign-up";
  }, [pathname]);

  const redirectToSignIn = () => navigate("/sign-in");
  const redirectToSignUp = () => navigate("/sign-up");
  const redirectToHome = () => navigate("/");

  const renderHeaderButtons = useMemo(() => {
    if (!isAuthPage)
      return (
        <Button className="header-button" onClick={redirectToSignIn}>
          Sign In
        </Button>
      );
    else
      return (
        <>
          <Button className="header-button" onClick={redirectToHome}>
            Home
          </Button>
          <Button className="header-button" onClick={redirectToSignUp}>
            Sign Up
          </Button>
        </>
      );
  }, [isAuthPage, pathname]);

  return (
    <Layout className="app-layout">
      {!isAuthPage ? (
        <Sider
          className="app-layout__sider"
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="xl"
        >
          <SideMenu />
        </Sider>
      ) : null}
      <Layout>
        <Header className="app-layout__header">
          <Typography.Title
            className="header-title"
            level={3}
            style={{ margin: 0 }}
          >
            Movies App
          </Typography.Title>
          <div className="buttons-section">{renderHeaderButtons} </div>
        </Header>
        <Content className="app-layout__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
