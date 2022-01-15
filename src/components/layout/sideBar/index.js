import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { handleScreenChange } from '@helpers'
import './sidebarStyles.css'

const { Sider } = Layout;

function SideBar() {

  const location=useLocation().pathname

  console.log(location)

  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    handleScreenChange(setCollapsed)
  }, [])

  return (
    <Sider className="sider"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <Menu
        className="sider-menu"
        defaultSelectedKeys={['Dashboard']}
        mode="inline"
      >
        <Menu.Item className={`${location === '/' ? 'active-menu' :'sider-menu-item' }`} key='vaccine-drive' onClick={() => navigate('/')} >
          Vaccine Drive
        </Menu.Item>
        <Menu.Item className={`${location === '/workers' ? 'active-menu' :'sider-menu-item' }`} key='workers' onClick={() => navigate('/workers')}>
          Workers
        </Menu.Item>
        <Menu.Item className={`${location === '/childrens' ? 'active-menu' :'sider-menu-item' }`} key='childrens' onClick={() => navigate('/childrens')}>
          Childrens
        </Menu.Item>
        <Menu.Item className={`${location === '/remaining-houses' ? 'active-menu' :'sider-menu-item' }`} key='orders' onClick={() => navigate('/remaining-houses')}>
        Remaining Houses
        </Menu.Item>
        <Menu.Item className={`${location === '/account-requests' ? 'active-menu' :'sider-menu-item' }`} key='account-requests' onClick={() => navigate('/account-requests')}>
          Account Requests
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar
