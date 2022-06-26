import React from 'react'
import "antd/dist/antd.css";
import "./Login.css";
import { Button, Checkbox, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import Particles from "react-tsparticles";
import axios from 'axios'

export default function Login(props) {
  const success = (username) => {
    message.success(`Welcome to Global news system! ${username}`);
  };
  
  const error = () => {
    message.error('Username or password does not match');
  };

  const onFinish = (values) => {
    //console.log(values);
    axios.get(`http://localhost:5000/users?roleState=${true}&username=${values.username}&password=${values.password}&_expand=role`).then
    (res=>{
      if(res.data.length===0){
        error()
      }else{
        localStorage.setItem("token",JSON.stringify(res.data[0]))
        props.history.push("/")
        success(res.data[0].username)
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ background: 'rgb(35,39,65)', height: '100%', overflow:'hidden'}}>
      <Particles height={document.documentElement.clientHeight}/>
      <div className="formContainer">
        <div className="loginTitle">
          <GlobalOutlined /> Global news release and management system
        </div>
        <Form
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            remember: false
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Form.Item
            label= {<label>Username</label>}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!"
              }
            ]}
          >
            <Input   prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label= {<label>Password</label>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password   prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 5,
              span: 8
            }}
          >
            <Checkbox style={{color:'white'}}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 8
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
