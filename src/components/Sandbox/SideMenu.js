import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import "./index.css";
import { withRouter } from 'react-router-dom'
import axios from 'axios';
const { Sider } = Layout;
const { SubMenu } = Menu

const iconList = {
  "/home": <UserOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />
}

function SideMenu(props) {
  const [meun, setMeun] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      setMeun(res.data)
    })
  }, [])
  
  const {role:{rights}} = JSON.parse(localStorage.getItem("token"))

  const checkPagePermission = (item) => {
    return item.pagepermisson && rights.includes(item.key)
  }
  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
          {renderMenu(item.children)}
        </SubMenu>
      }

      return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
        props.history.push(item.key)
      }}>{item.title}</Menu.Item>
    })
  }
  const selectedItem = [props.location.pathname]
  const openItem = ["/" + props.location.pathname.split("/")[1]]
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div className="logo" >Global News System</div>
        <div style={{ flex: 1, "overflow": "auto" }}>
          <Menu theme="dark" mode="inline" selectedKeys={selectedItem} defaultOpenKeys={openItem}>
            {renderMenu(meun)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
export default withRouter(SideMenu)

