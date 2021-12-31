import React from 'react'
import { Avatar, Layout } from 'antd';
import './navStyles.css'

const { Header } = Layout;

function Nav() {
    return (
        <Header className="header">
            <div className='icon-div'>
            </div>
            <h2 className='title' level={3}>Admin Panel</h2>
        </Header>
    )
}

export default Nav
