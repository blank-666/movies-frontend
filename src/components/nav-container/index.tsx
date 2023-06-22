import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { FC, ReactNode } from "react";
import { IMenuItem } from "../../interfaces/menu.interface";
import NavMenu from "../nav-menu";
import "./style.scss";

interface INavContainer {
  menu: IMenuItem[];
  children: ReactNode;
}

const NavContainer: FC<INavContainer> = ({ menu, children }) => {
  return (
    <Layout className="nav-menu">
      <Content>{children}</Content>
      {menu.length ? (
        <Sider className="nav-menu__sider">
          <NavMenu menu={menu} />
        </Sider>
      ) : null}
    </Layout>
  );
};

export default NavContainer;
