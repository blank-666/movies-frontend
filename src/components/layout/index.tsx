import { FC, useContext, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { UserContext } from "../../context/user.context";
import authService from "../../services/auth";

import SideMenu from "../sider";

import "./style.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { LogoutOutlined } from "@ant-design/icons";

const PageLayout: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isMobile } = useWindowDimensions();

  const isAuthPage = useMemo(() => {
    return pathname === "/sign-in" || pathname === "/sign-up";
  }, [pathname]);

  const redirectToSignIn = () => navigate("/sign-in");
  const redirectToSignUp = () => navigate("/sign-up");
  const redirectToHome = () => navigate("/");

  const logoutHandler = () => {
    authService.logOut();
    setUser(null);
  };

  const headerContent = useMemo(() => {
    if (user) {
      return (
        <>
          <Typography.Text className="user-name">{user.name}</Typography.Text>
          {isMobile ? (
            <Button
              onClick={logoutHandler}
              ghost
              style={{ padding: "0 0.4rem" }}
            >
              <LogoutOutlined />
            </Button>
          ) : (
            <Button onClick={logoutHandler}>Log Out</Button>
          )}
        </>
      );
    }
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
  }, [isAuthPage, pathname, user]);

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
          <div className="buttons-section">{headerContent} </div>
        </Header>
        <Content className="app-layout__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
