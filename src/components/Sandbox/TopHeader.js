import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, } from "@ant-design/icons";
import { withRouter } from 'react-router-dom'
const { Header } = Layout;


function TopHeader(props) {
  const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div>
              {roleName}
            </div>
          ),
        },
        {
          key: '2',
          danger: true,
          label: (
            <div onClick={() => {
              localStorage.removeItem("token")
              props.history.replace("/login")
            }}>
              Log out
            </div>
          )
        },
      ]}
    />
  );
  const [collapsed, setCollapsed] = useState(true);
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {
        collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
      }
      <div style={{ float: "right" }}>
        <span>welcome! {username}</span>
        <Dropdown overlay={menu}>
          <span style={{ paddingLeft: "10px" }}><Avatar size={48} icon={<UserOutlined />} /></span>
        </Dropdown>
      </div>
    </Header>
  )
}

export default withRouter(TopHeader);