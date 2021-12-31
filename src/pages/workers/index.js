import React, { useState, useEffect } from 'react';
import { message, Space, Tag, Typography } from 'antd';
import { LayoutComponent, TableComponent, Loader } from '@components'
import { useNavigate } from 'react-router';
import { http } from '@services'
import './workersStyles.css'

const { Title } = Typography

export default function Workers() {

  const navigate = useNavigate()

  const [data, setData] = useState([
    { id: '12123', name: 'XYZ3', email: 'xyz@gmail.com', phone: '031xxxx', cnic: '222222', status: 'ACTIVE', date: '03 Jan 2020' },
  ])

  async function getWorkers() {
    const url = `admin/GET/all-workers`;

    const response = await http(url);

    if (response?.success) {
      setData(response.beneficiaries)
    }
    else {
      if (response?.message === 'No workers found') {
        setData([])
      } else
        message.error('Something went wrong')

    }

  }

  useEffect(() => {
    getWorkers()
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
        <Title className='heading'>Workers</Title>
        {data !== null ?
          <>
            <TableComponent columns={columns} data={data} />
            <button className='custom-btn' onClick={() => navigate('/add-worker')}>Add</button>
          </>

          :
          <Loader />
        }
      </div>
    </LayoutComponent>
  )
}


