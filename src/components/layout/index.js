import React, { useEffect, useState } from 'react'
import { Layout } from 'antd';
import Nav from './nav'
import SideBar from './sideBar'
import MainContent from './content'
import MainFooter from './footer'
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
          user && <SideBar />
        }
        <Layout >
          <Content>
            <MainContent >
              {children}
            </MainContent>
          </Content>
          <MainFooter />
        </Layout>
      </Layout>
    </Layout>
  )
}
