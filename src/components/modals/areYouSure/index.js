import React, {useLayoutEffect, useState } from 'react'
import { Modal, Typography} from 'antd';
import { AiOutlineInfoCircle } from "react-icons/ai"
import { handleModalSize } from "@helpers"
import "./areYouSureStyles.css"

const { Title } = Typography


function AreYouSureModal({ showModal, setShowModal, text, onOk }) {

    const [screenWidth, setScreenWidth] = useState()

    useLayoutEffect(() => {
        handleModalSize(setScreenWidth)
    }, [])

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <Modal visible={showModal}
            centered
            width={screenWidth}
            okText={'Yes'}
            cancelText={'No'}
            onCancel={handleCancel}
            onOk={onOk}
            className='custom-modal'
            cancelButtonProps={{className:'modal-cancel-btn'}}
            okButtonProps={{className:'modal-ok-btn'}}
        >
            <div className='mt-2'>
                <div className='text-center'>
                    <AiOutlineInfoCircle size={60} className='icon-red' />
                </div>
                <Title level={2} className='text-center mt-1'>Are You Sure?</Title>
                <p className='text-center'>{text}</p>

            </div>

        </Modal>
    );

}

export default AreYouSureModal
