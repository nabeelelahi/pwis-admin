import React, { useEffect, useState } from 'react';
import { Tag, Space, message, Typography } from 'antd';
import { LayoutComponent, TableComponent, Loader } from '@components'
import { http } from '@services'
import { useNavigate } from 'react-router';
import './sponserStyles.css'

const { Title } = Typography

export default function Childrens() {

  const navigate = useNavigate()

  const [data, setData] = useState([
    { id: '123', name: 'XYZ', email: 'xyz@gmail.com', phone: '031xxxx', cnic: '222222', status: 'ACTIVE', date: '31 Oct 2021' },

  ])

  async function getChildrens() {

    const url = `admin/GET/all-childrens`;

    const response = await http(url);

    if (response?.success) {
      console.log(response?.success)
      setData(response.data)
    }
    else {
      message.error("Something went wrong")
    }

  }

  useEffect(() => {
    getChildrens()
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
      title: 'Action',
      key: 'action',
      dataIndex: 'status',
      render: (text, record) => (
        <Space size="middle">
          <Tag color={'red'} >Delete</Tag>
        </Space>
      ),
    },
  ]

  return (
    <LayoutComponent>
      <div className="container">
        <Title className='heading'>Childrens</Title>
        {data ?
          <>
            <TableComponent columns={columns} data={data} />
            <button className='custom-btn' onClick={() => navigate('/add-children')}>Add</button>
          </>
          :
          <Loader />
        }
      </div>
    </LayoutComponent>
  )
}


