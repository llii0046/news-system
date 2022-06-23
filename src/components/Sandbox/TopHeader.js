import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, } from "@ant-design/icons";
const { Header} = Layout;

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: "Super admin"
      },
      {
        key: '2',
        danger: true,
        label: "Log out",
      },
    ]}
  />
);

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(true);
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Header className="site-layout-background" style={{padding: '0 16px'}}>
      {
        collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
      }
      <div style={{ float: "right" }}>
        <span>welcome back</span>
        <Dropdown overlay={menu}>
          <span style={{paddingLeft: "10px"}}><Avatar size={48} icon={<UserOutlined />} /></span>
        </Dropdown>
      </div>
    </Header>
  )
}
