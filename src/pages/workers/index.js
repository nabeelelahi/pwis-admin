import React, { useState, useEffect } from 'react';
import { message, Space, Tag, Typography, Avatar, Image } from 'antd';
import { LayoutComponent, TableComponent, Loader } from '@components'
import { useNavigate } from 'react-router';
import { http } from '@services'
import './workersStyles.css'

const { Title } = Typography

export default function Workers() {

  const navigate = useNavigate()

  const [data, setData] = useState([
    { id: '12123', firstName: 'ABC', lastName: 'XYZ', email: 'abcxyz@gmail.com', phone: '031xxxx', cnic: '42101-2689780-8', status: 'ACTIVE', address: 'xyz',city:'Karachi',district:'Central',gender:'male' },
    { id: '12121', firstName: 'ABC', lastName: 'XYZ', email: 'abcxyz@gmail.com', phone: '031xxxx', cnic: '42101-2689780-8', status: 'ACTIVE', address: 'abc',city:'Karachi',district:'Central',gender:'female' },
  ])

  async function getWorkers() {
    const url = `admin/GET/all-workers`;

    const response = await http(url);

    if (response?.success) {
      setData(response.data)
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
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    }

    , {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      render: () => {
        return <Avatar
          size={50}
          src={
            <Image
              src="https://joeschmoe.io/api/v1/random"
              style={{
                width: 50,
              }}
            />
          }
        />
      }

    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',

    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',

    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',

    },
    {
      title: 'CNIC',
      dataIndex: 'cnic',
      key: 'cnic',
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
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'status',
      fixed: 'right',
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


