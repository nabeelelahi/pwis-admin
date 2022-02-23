import React, { useEffect, useState } from 'react'
import { Layout } from 'antd';
import Nav from './nav'
import SideBar from './sideBar'
import MainContent from './content'
import CustomFooter from './footer'
import { CheckUser } from '@helpers';

const { Content } = Layout

export default function LayoutComponent({ children }) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(CheckUser())
  }, [])

  return (

    <Layout>
      <Nav />
      <Layout>
        {
          user?.email && <SideBar />
        }
        <Layout >
          <Content>
            <MainContent >
              {children}
            </MainContent>
          </Content>
          <CustomFooter />
        </Layout>
      </Layout>
    </Layout>
  )
}
