import React, { useState, useEffect } from 'react'
import { Tag, Space, message, Typography } from 'antd';
import { LayoutComponent, TableComponent, Loader } from '@components'
import { http } from '@services'

const { Title } = Typography

export default function Orders() {

  const [data, setData] = useState([
    { name: 'faizan', email: 'faizan@gmail.com', phone: '0312-3432298', cnic: '42101-2948608-9', status: 'ACTIVE', date: '31 Oct 2021' },
    { name: 'Ahmed', email: 'ahmed@gmail.com', phone: '0312-3432266', cnic: '42101-2948608-6', status: 'ACTIVE', date: '05 Nov 2021' },

  ])

  async function getOrders() {
    const url = `admin/GET/all-orders`;

    const response = await http(url);

    if (response?.success) {
      setData(response.data)
    }
    else {
      message.error("Something went wrong")
    }

  }

  useEffect(() => {
    getOrders()

  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'CNIC',
      dataIndex: 'cnic',
      key: 'cnic',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Space size="middle">
          <Tag style={{ color: text === "ACTIVE" ? 'green' : 'red' }}>{text}</Tag>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'status',
      render: (text, record) => (
        <Space size="middle">
          <Tag color={text === 'ACTIVE' ? 'red' : 'green'} >{text === 'ACTIVE' ? 'Reject' : 'Accept'}</Tag>
        </Space>
      ),
    },
  ]

  return (
    <LayoutComponent>
      <div className="container">

        <Title className='heading'>Orders</Title>
        {
          data ?
            <TableComponent columns={columns} data={data} />
            :
            <Loader />
        }
      </div>
    </LayoutComponent >
  )
}
