import React, { useState } from 'react'
import { BarsOutlined } from "@ant-design/icons";
import { Modal, Button, Tree } from 'antd';


export default function PopUpMenu({treeData,item, dataSource}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRights, setCurrentRights] = useState();

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
      };
    
      const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
      };


    return (
        <>
            <Button type="primary" shape="circle" icon={<BarsOutlined />} onClick={()=>{
                setIsModalVisible(true)
                setCurrentRights(item.rights)}} />
            <Modal title="Permission assignment" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    defaultCheckedKeys={currentRights}
                    onSelect={onSelect}
                    onCheck={onCheck}
                    treeData={treeData}
                />
            </Modal>
        </>
    )
}
