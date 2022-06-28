import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DeleteButton from '../components/DeleteButton';
import { EditOutlined } from "@ant-design/icons";
import { Table, Button, Switch } from 'antd'

export default function UserList() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users").then(res => {
      setDataSource(res.data)
    })
  }, [])

  const columns = [
    {
      title: 'Region',
      dataIndex: 'region',
      render: (region) => {
        return <b> {region} </b>
      }
    },
    {
      title: 'Role name',
      dataIndex: 'roleId',
    },
    {
      title: 'User name',
      dataIndex: 'username',
    },
    {
      title: 'User state',
      dataIndex: 'roleState',
      render: () => {
        return (
          <div>
            <Switch ></Switch>
          </div>
        )
      }
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <DeleteButton text={"user"} item={item} deleteMethod />
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </div>
        )
      }
    }
  ]

  return (
    <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
      <div style={{ flex: 1, "overflow": "auto" }}>
        <Table dataSource={dataSource} columns={columns}
          pagination={{
            pageSize: 5
          }}
        />
      </div>
    </div>
  )
}
