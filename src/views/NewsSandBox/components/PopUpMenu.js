import React, { useState } from 'react'
import { BarsOutlined } from "@ant-design/icons";
import { Modal, Button, Tree } from 'antd';


export default function PopUpMenu({ treeData, item, updateMethod }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRights, setCurrentRights] = useState([]);
    const [currentId, setcurrentId] = useState(0)

    const handleOk = () => {
        setIsModalVisible(false)
        updateMethod(currentId,currentRights)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onCheck = (checkedKeys) => {
        setCurrentRights(checkedKeys)
    };

    return (
        <>
            <Button type="primary" shape="circle" icon={<BarsOutlined />} onClick={() => {
                setIsModalVisible(true)
                setCurrentRights(item.rights)
                setcurrentId(item.id)
            }} />
            <Modal title="Permission assignment" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkStrictly={true}
                    checkedKeys={currentRights}
                    onCheck={onCheck}
                    treeData={treeData}
                />
            </Modal>
        </>
    )
}
