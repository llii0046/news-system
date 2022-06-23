import React from 'react'
import SideMenu from '../../components/Sandbox/SideMenu'
import TopHeader from '../../components/Sandbox/TopHeader'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home/Home'
import UserList from './User-manage/UserList'
import RoleList from './Right-manage/RoleList'
import RightList from './Right-manage/RightList'
import NoPermission from './NoPermission/NoPermission'
import { Layout } from 'antd';
import "./NewsSandBox.css";
const {Content} = Layout;

export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280
          }}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user-manage/list" component={UserList} />
            <Route path="/right-manage/role/list" component={RoleList} />
            <Route path="/right-manage/right/list" component={RightList} />
            <Redirect from="/" to="/home" exact />
            <Route path="*" component={NoPermission} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}
