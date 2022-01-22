import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { handleScreenChange } from '@helpers'
import { FaChild } from "react-icons/fa"
import { AiOutlineUserAdd, AiOutlineUsergroupDelete, AiOutlineHome } from "react-icons/ai"
import { MdOutlineOtherHouses, MdPostAdd, MdOutlineLocationOn, MdOutlineChildCare } from "react-icons/md"
import { RiUserSettingsLine } from "react-icons/ri"
// import {MdOutlineLocationOn} from "react-icons/gr"
import './sidebarStyles.css'

const { Sider } = Layout;

const { SubMenu } = Menu;

function SideBar() {

  const location = useLocation()?.pathname

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
        mode='inline'
      >
        <Menu.Item className={`${location === '/' ? 'active-menu' : 'sider-menu-item'}`} key='Home' onClick={() => navigate('/')} icon={<AiOutlineHome size={20} />}>
          <span className='sider-menu-item-title'>
            Dashboard
          </span>
        </Menu.Item>
        <Menu.Item className={`${location === '/vaccine-drive' ? 'active-menu' : 'sider-menu-item'}`} key='vaccine-drive' onClick={() => navigate('/vaccine-drive')} icon={<MdOutlineLocationOn size={20} />}>
          <span className='sider-menu-item-title'>
            Vaccine Drive
          </span>
        </Menu.Item>
        <Menu.Item className={`${location === '/workers' ? 'active-menu' : 'sider-menu-item'}`} key='workers' onClick={() => navigate('/workers')}
          icon={<AiOutlineUsergroupDelete size={20} />}
        >
          <span className='sider-menu-item-title'>
            Workers
          </span>
        </Menu.Item>
        <Menu.Item className={`${location === '/childrens' ? 'active-menu' : 'sider-menu-item'}`} key='childrens' onClick={() => navigate('/childrens')} icon={<MdOutlineChildCare size={20} />}>
          <span className='sider-menu-item-title'>
            Childrens
          </span>
        </Menu.Item>
        <Menu.Item className={`${location === '/remaining-houses' ? 'active-menu' : 'sider-menu-item'}`} key='Remaining Houses' onClick={() => navigate('/remaining-houses')} icon={<MdOutlineOtherHouses size={20} />}>
          <span className='sider-menu-item-title'>
            Remaining Houses
          </span>
        </Menu.Item>
        <SubMenu

          key="Add"
          title={
            <span className="bg-transparent ">Add</span>
          }
          icon={<MdPostAdd size={20} />}
        >
          <Menu.ItemGroup key='Add Group' className='bg-transparent border-bottom-white'>
            <Menu.Item className="submenu-item" key='Upcoming' onClick={() => navigate('/add-worker')} icon={<AiOutlineUserAdd size={20} />}>
              <span className='sider-menu-item-title'>
                Worker
              </span>
            </Menu.Item>

          </Menu.ItemGroup>
        </SubMenu>

        <Menu.Item className={`${location === '/account-requests' ? 'active-menu' : 'sider-menu-item'}`} key='account-requests' onClick={() => navigate('/account-requests')} icon={<RiUserSettingsLine size={20} />}>
          <span className='sider-menu-item-title'>
            Account Requests
          </span>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar
// <Menu.Item className="submenu-item " key='Previous' onClick={() => navigate('/previous-appointments')}>Previous</Menu.Item>