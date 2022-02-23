import React, { useState, useEffect } from 'react';
import { message, Space, Tag, Typography, Avatar, Image, Input, Radio } from 'antd';
import { LayoutComponent, TableComponent, Loader, AreYouSureModal } from '@components'
import { useNavigate } from 'react-router';
import { http } from '@services'
import './workersStyles.css'

const { Title } = Typography

const { Search } = Input

export default function Workers() {

  const [showModal, setShowModal] = useState(false)

  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState('email')

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [deletingId, setDeletingId] = useState('')


  async function getWorkers() {
    const url = `admin/GET/all-workers`;

    const response = await http(url);

    if (response?.success) {
      setData(response?.data)
    }
    else {
      message.error('Something went wrong')
    }
  }

  async function searchWorkers() {
    const url = `admin/GET/search/workers`;
    let params = searchType ==='email' && {email:search} || searchType ==='name' &&{name:search}
    const options = {
      method: 'POST',
      'content-type': 'application/json',
      body: JSON.stringify(params)
    }

    const response = await http(url, options);

    if (response?.success) {
      setData(response?.results)
    }
    else {
      message.error("Something went wrong")
    }
  }

  async function deleteWorker() {
    const url = `admin/DELETE/delete-worker/${deletingId}`;
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }

    const response = await http(url, options);

    if (response?.success) {
      message.success('Worker deleted successfully')
      await getWorkers()
      setShowModal(false)
    }
    else {
      message.error('Something went wrong')
    }

  }



  useEffect(() => {
    getWorkers()
  }, [search === ''])

  const columns = [
    {
      title: 'Sno',
      key: '_id',
      render: (text, record, index) => {
        return (
          <span>{index + 1}</span>
        )
      }
    }

    , {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      render: (text, record) => {
        return <Avatar
          size={50}
          className={record.gender === 'male' ? 'green-bg' : 'orange-bg'}
        >{`${record?.firstName.substring(0, 1).toUpperCase()}${record?.lastName.substring(0, 1).toUpperCase()}`}
        </Avatar>
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
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Actions',
      key: 'action',
      dataIndex: 'status',
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <Tag color={'green'} onClick={() => navigate('/update-worker', { state: record })} >Edit</Tag>
          <Tag color={'red'} onClick={() => {
            setDeletingId(record?._id)
            setShowModal(true)
          }} >Delete</Tag>
        </Space>
      ),
    },
  ]

  return (
    <LayoutComponent>
      <div className="container">
        <Title className='heading'>Workers</Title>
        <div className='mb-3 search-box-container' >
          <Search placeholder="Search workers" enterButton="Search" size="large" loading={false} className='search-input'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onSearch={() => searchWorkers()}
          />
          <Radio.Group name="radiogroup" onChange={(e) => setSearchType(e.target.value)} value={searchType}>
            <Radio value={'email'}>With Email</Radio>
            <Radio value={'name'}>With Name</Radio>
          </Radio.Group>
        </div>
        <TableComponent columns={columns} data={data} />
      </div>
      <AreYouSureModal showModal={showModal} setShowModal={setShowModal} text={'Do you really want to delete this worker?'} onOk={() => deleteWorker()} />
    </LayoutComponent>
  )
}


