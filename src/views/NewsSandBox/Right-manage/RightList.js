import React, { useEffect, useState } from 'react'
import { Table, Tag, Button,Modal } from 'antd'
import axios from 'axios';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
const {confirm} = Modal
export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      const list =res.data
   
      list.forEach(item=>{
        if(item.children.length === 0){
          item.children = ""
        }
      })
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
      title: 'Permission name',
      dataIndex: 'title',

    },
    {
      title: 'Permission path',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="success"> {key} </Tag>
      }
    },
    {
      title: 'Operation',
      render: (item) => {
        return <div>
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
          <Button type="danger" shape="circle" icon={<DeleteOutlined/>} 
          onClick={()=> showConfirm(item)}/>
        </div>
      }
    }
  ]

  const showConfirm=(item) =>{
    confirm({
      title: 'Are you sure to delete this permission?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        deletePermission(item); 
      },
      onCancel() {
      },
    });
  };
  
  const deletePermission=(item)=>{
    console.log(item)
    setDataSource(dataSource.filter(data=>data.id!==item.id))
    //axios.delete(`http://localhost:5000/rights/${item.id}`)
  }

  return (
    <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
    <div style={{ flex: 1, "overflow": "auto" }}>
      <Table dataSource={dataSource} columns={columns} 
      pagination={{
        pageSize:10        
      }} 
      />
    </div>
    </div>
  )
}
