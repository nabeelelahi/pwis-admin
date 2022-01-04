import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './loaderStyles.css'

export default function Loader() {
    return (
        <div className="container loader-container">
        <Spin size="large"  indicator={<LoadingOutlined style={{ fontSize: 50, color:'#44524f' }} spin />} />
     </div>
    )
}