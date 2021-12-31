import React from 'react'
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router';
import './sidebarStyles.css'

const { Sider } = Layout;

function SideBar() {
  const navigate = useNavigate()

  return (
    <Sider className="sider"
    >
      <Menu
        className="sider-menu"
        defaultSelectedKeys={['Dashboard']}
        mode="inline"
      >
        <Menu.Item className="sider-menu-item" key='vaccine-drive' onClick={() => navigate('/')}>
          Vaccine Drive
        </Menu.Item>
        <Menu.Item className="sider-menu-item" key='workers' onClick={() => navigate('/workers')}>
          Workers
        </Menu.Item>
        <Menu.Item className="sider-menu-item" key='childrens' onClick={() => navigate('/childrens')}>
          Childrens
        </Menu.Item>
        <Menu.Item className="sider-menu-item" key='account-requests' onClick={() => navigate('/account-requests')}>
          Account Requests
        </Menu.Item>
        <Menu.Item className="sider-menu-item" key='orders' onClick={() => navigate('/orders')}>
          Orders
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar
