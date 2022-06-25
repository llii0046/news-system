import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import axios from 'axios'; 
import DeleteButton from './components/DeleteButton';
import PopUpMenu from './components/PopUpMenu';

export default function RoleList() {
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
      axios.get("http://localhost:5000/rights?_embed=children").then(res => {
        setTreeData(res.data)
      })
    }, [])
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
            <DeleteButton text={"role"} item={item} deleteMethod={deleteRole}/>
            <PopUpMenu treeData={treeData} item={item} dataSource={dataSource}/>
          </div>
        )
      }
    }
  ]

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
