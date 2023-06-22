import { Menu } from "antd";
import { FC } from "react";
import { IMenuItem } from "../../interfaces/menu.interface";
import "./style.scss";

interface INavMenu {
  menu: IMenuItem[];
}
const NavMenu: FC<INavMenu> = ({ menu }) => {
  const clickHandler = (e: any) => {
    console.log("click menu item:", e);
  };
  return (
    <Menu
      className="nav-menu"
      items={menu}
      selectable={false}
      onClick={clickHandler}
    />
  );
};

export default NavMenu;
