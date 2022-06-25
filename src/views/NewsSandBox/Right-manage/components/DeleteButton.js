import React from 'react'
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Button } from 'antd'
const { confirm } = Modal

export default function DeleteButton({text, item, deleteMethod}) {
    const showConfirm = (item) => {
        confirm({
          title: `Are you sure to delete this ${text}?`,
          icon: <ExclamationCircleOutlined />,
          // content: 'Some descriptions',
          onOk() {
            deleteMethod(item);
          },
          onCancel() {
          },
        });
    }; 

  return (
    <Button danger shape="circle" icon={<DeleteOutlined />}
    onClick={() => showConfirm(item)} />
  )
}
