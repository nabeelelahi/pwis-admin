import React, { useState, useEffect } from 'react';
import { message, Space, Tag, Typography, Avatar, Image, Input } from 'antd';
import { LayoutComponent, TableComponent, Loader,AreYouSureModal } from '@components'
import { useNavigate } from 'react-router';
import { http } from '@services'
import './workersStyles.css'

const { Title } = Typography

const { Search } = Input

export default function Workers() {

  const [showModal, setShowModal] = useState(false)

  const [search, setSearch] = useState([])

  const navigate = useNavigate()

  const [data, setData] = useState([
    { key: 12123, firstName: 'ABC', lastName: 'XYZ', email: 'abcxyz@gmail.com', phone: '031xxxx', cnic: '42101-2689780-8', status: 'ACTIVE', address: 'xyz', city: 'Karachi', district: 'Central', gender: 'male' },
    { key: 12121, firstName: 'ABC', lastName: 'XYZ', email: 'abcxyz@gmail.com', phone: '031xxxx', cnic: '42101-2689780-8', status: 'ACTIVE', address: 'abc', city: 'Karachi', district: 'Central', gender: 'female' },
  ])

  // async function getWorkers() {
  //   const url = `admin/GET/all-workers`;

  //   const response = await http(url);

  //   if (response?.success) {
  //     setData(response.data)
  //   }
  //   else {
  //     if (response?.message === 'No workers found') {
  //       setData([])
  //     } else
  //       message.error('Something went wrong')

  //   }

  // }

  // useEffect(() => {
  //   getWorkers()
  // }, [])

  const columns = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key'
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
                wkeyth: 50,
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
        <Space size="mkeydle">
          <Tag color={'green'} onClick={() => navigate('/update-worker')} >Edit</Tag>
          <Tag color={'red'} onClick={() => setShowModal(true)} >Delete</Tag>
        </Space>
      ),
    },
  ]

  

  return (
    <LayoutComponent>
      <div className="container">
        <Title className='heading'>Workers</Title>
        <div className='mb-3 search-box-container' >
          <Search placeholder="Search workers" enterButton="Search" size="large" loading={false} className='search-input mr-3'
            onChange={(e) => console.log(e.target.value)}
            value={search}

          />
        </div>
        {data !== null ?
          <>
            <TableComponent columns={columns} data={data} />
            <button className='custom-btn mt-4' onClick={() => navigate('/add-worker')}>Add</button>


          </>

          :
          <Loader />
        }
      </div>
      <AreYouSureModal showModal={showModal} setShowModal={setShowModal} text={'Do you really want to delete this worker?'} onOk={() => console.log('onOk')} />
    </LayoutComponent>
  )
}


