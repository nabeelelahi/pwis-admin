import React, { useState, useEffect } from 'react';
import { message, Space, Tag, Typography, Avatar, Image, Input } from 'antd';
import { LayoutComponent, TableComponent, Loader, AreYouSureModal } from '@components'
import { useNavigate } from 'react-router';
import { http } from '@services'
import './workersStyles.css'

const { Title } = Typography

const { Search } = Input

export default function Workers() {

  const [showModal, setShowModal] = useState(false)

  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const [data, setData] = useState([])

  async function getWorkers() {
    const url = `admin/GET/all-workers`;

    const response = await http(url);

    if (response?.success) {
      if (response?.message === 'Ops, no users have been registered yet..') {
        setData([])
      } else {
        setData(response?.data)
      }
    }
    else {
      message.error('Something went wrong')
    }
  }

  async function searchWorkers() {
    const url = `admin/GET/search/workers/${search}`;

    const response = await http(url);

    if (response?.success) {
      if (response?.message === 'Ops, no users have been registered yet..') {
        setData([])
      } else {
        setData(response?.data)
      }
    }
    else {
      message.error("Something went wrong")
    }
  }

  useEffect(() => {
    getWorkers()
  }, [search === ''])

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id'
    }

    , {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      render: (text) => {
        return <Avatar
          size={50}
          src={
            <Image
              src={text}
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
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onSearch={() => searchWorkers()}
          />
        </div>
        <TableComponent columns={columns} data={data} />
      </div>
      <AreYouSureModal showModal={showModal} setShowModal={setShowModal} text={'Do you really want to delete this worker?'} onOk={() => console.log('onOk')} />
    </LayoutComponent>
  )
}


