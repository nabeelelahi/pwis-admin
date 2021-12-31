import React from 'react'
import { Layout } from 'antd';
import './footerStyles.css'

const { Footer } = Layout;

export default function MainFooter(props) {
    const year = new Date().getFullYear()
    return (
        <Footer className='footer'>{`Copyright © ${year} PWIC. All rights reserved.`}</Footer>
    )
}

