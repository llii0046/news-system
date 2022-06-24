import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'antd'
import axios from 'axios'; 
import { DeleteOutlined, BarsOutlined,ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal
export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      setDataSource(res.data)
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b> {id} </b>
      }
    },
    {
      title: 'Role name',
      dataIndex: 'roleName',
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} 
            onClick={() => showConfirm(item)}/>
            <Button type="primary" shape="circle" icon={<BarsOutlined />} />
          </div>
        )
      }
    }
  ]

  const showConfirm = (item) => {
    confirm({
      title: 'Are you sure to delete this role?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        deleteRole(item);
      },
      onCancel() {
      },
    });
  };

  const deleteRole = (item) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        //axios.delete(`http://localhost:5000/roles/${item.id}`)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} />
    </div>
  )
}
