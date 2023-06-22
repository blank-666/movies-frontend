import { Menu } from "antd";
import React, { FC, useMemo } from "react";
import type { MenuProps } from "antd";
import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MenuItemGroupType,
  MenuItemType,
  SubMenuType,
} from "antd/es/menu/hooks/useItems";
import { IMenuItem } from "../../interfaces/menu.interface";

type MenuItem = Required<MenuProps>["items"][number];

const SideMenu: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const MENU_ITEMS: MenuItem[] = [
    {
      key: "home",
      icon: <UserOutlined />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      key: "movies",
      icon: <DesktopOutlined />,
      label: "Movies",
      // onClick: () => navigate("/movies"),
      children: [
        {
          key: "movies_manage",
          label: "Manage",
          onClick: () => navigate("/movies"),
        },
        {
          key: "movies_create",
          label: "Create",
          onClick: () => navigate("/movies/create"),
        },
      ],
    },
  ];

  // const selectedMenuItem = useMemo(() => {
  //   if (pathname === "/") return "home";
  //   const selectedItemKey = MENU_ITEMS.find((item) =>
  //     pathname.includes(item?.key as string)
  //   )?.key as string;

  //   console.log("selectedItemKey", selectedItemKey);
  //   return selectedItemKey || "";
  // }, [MENU_ITEMS, pathname]);

  type MenuItemWithChildren<T> = Partial<T> & { children: MenuItem[] };

  const findSubItemByPathname = (
    selectedItem: MenuItemWithChildren<MenuItem>
  ) =>
    selectedItem!.children?.find((child) => {
      const childKey = child?.key! as string;
      const [_, subKey] = childKey.split("_");
      return pathname.includes(subKey);
    });

  const findManageSubItem = (selectedItem: MenuItemWithChildren<MenuItem>) =>
    selectedItem!.children?.find((child) => {
      const childKey = child?.key! as string;
      return childKey.includes("manage");
    });

  const selectedMenuItem = useMemo(() => {
    if (pathname === "/") return "home";
    const selectedItem = MENU_ITEMS.find((item) =>
      pathname.includes(item?.key as string)
    );

    let selectedItemKey = selectedItem?.key as string;

    if ("children" in selectedItem!) {
      const selectedSubItem =
        findSubItemByPathname(selectedItem as MenuItemWithChildren<MenuItem>) ||
        findManageSubItem(selectedItem as MenuItemWithChildren<MenuItem>);

      selectedItemKey = selectedSubItem!.key as string;
    }

    return selectedItemKey || "";
  }, [MENU_ITEMS, pathname]);

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["home"]}
      selectedKeys={[selectedMenuItem]}
      mode="inline"
      items={MENU_ITEMS}
    />
  );
};

export default SideMenu;
