import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import axios from 'axios';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal

export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      const list = res.data

      list.forEach(item => {
        if (item.children.length === 0) {
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
        const hasPermission = (item.pagepermisson === undefined)
        return (<div>
          <Popover content={content(item.pagepermisson, item)} title="Page configuration item" trigger={hasPermission ? "" : "click"} >
            <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={hasPermission} />
          </Popover>
          <Button type="danger" shape="circle" icon={<DeleteOutlined />}
            onClick={() => showConfirm(item)} />
        </div>
        )
      }
    }
  ]

  const showConfirm = (item) => {
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

  const content = (isChecked,item) => {
    return (
      <div>
        <Switch checked={isChecked} onChange={()=>switchMethod(item)}></Switch>
      </div>
    )
  };

  const switchMethod = (item) => {
    const hasPagepermisson = item.pagepermisson===1
    item.pagepermisson = hasPagepermisson?0:1
    setDataSource([...dataSource])
    if(item.grade ===1){
      axios.patch(`http://localhost:5000/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }else{
      axios.patch(`http://localhost:5000/children/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }
  };



  const deletePermission = (item) => {
    if (item.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id))
      //axios.delete(`http://localhost:5000/rights/${item.id}`)
    }
    else {
      let list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setDataSource([...dataSource])
      //axios.delete(`http://localhost:5000/children/${item.id}`)
    }

  }

  return (
    <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
      <div style={{ flex: 1, "overflow": "auto" }}>
        <Table dataSource={dataSource} columns={columns}
          pagination={{
            pageSize: 10
          }}
        />
      </div>
    </div>
  )
}
