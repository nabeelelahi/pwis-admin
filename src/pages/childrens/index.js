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
    { id: '123', firstName: 'abc',lastName: 'xyz', email: 'abcxyz@gmail.com', phone: '031xxxx', cnic: '42101-232222-2', address:'abc',status: 'ACTIVE', date: '31 Oct 2021',age:'3 years',previousHouse:'abc',familyNo:'1' },

  ])

  async function getChildrens() {

    const url = `admin/GET/all-childrens`;

    const response = await http(url);

    if (response?.success) {
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Family No',
      dataIndex: 'familyNo',
      key: 'familyNo',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Parent CNIC',
      dataIndex: 'cnic',
      key: 'cnic',
    },
    {
      title: 'Previous House',
      dataIndex: 'previousHouse',
      key: 'previousHouse',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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


