import React, { useEffect, useState } from 'react';
import { Tag, Space, message, Typography, Input } from 'antd';
import { LayoutComponent, TableComponent, Loader, AreYouSureModal } from '@components'
import { http } from '@services'
import { useNavigate } from 'react-router';
import "./childrenStyles.css"

const { Title } = Typography

const { Search } = Input

export default function Childrens() {

  const navigate = useNavigate()

  const [search, setSearch] = useState([])

  const [showModal, setShowModal] = useState(false)


  const [data, setData] = useState([])

  async function getChildrens() {
    const url = `admin/GET/children`;

    const response = await http(url);

    if (response?.success) {
      if (response?.message === 'Ops, no users have been registered yet..') {
        setData([])
      }else{
      setData(response?.data)
      }
    }
    else {
        message.error('Something went wrong')
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
      title: 'Vaccination Status',
      dataIndex: 'vaccinationStatus',
      key: 'vaccinationStatus',
      render: (text, record) => (
        <Space className='center-status-tag'>
          <Tag className={`${text === 'DONE' ? 'done' : 'pending'}`}>{text}</Tag>
        </Space>
      )
    },
    {
      title: 'Next Vaccination Date',
      dataIndex: 'nextVaccDate',
      key: 'nextVaccDate',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'status',
      render: (text, record) => (
        <Space size="middle">
          <Tag color={'red'} onClick={() => setShowModal(true)}>Delete</Tag>
        </Space>
      ),
      fixed: 'right'
    },
  ]

  return (
    <LayoutComponent>
      <div className="container">
        <Title className='heading'>Childrens</Title>
        <div className='mb-3 search-box-container' >
          <Search placeholder="Search childrens" enterButton="Search" size="large" loading={false} className='search-input mr-3'
            onChange={(e) => console.log(e.target.value)}
            value={search}

          />
        </div>
        {data ?
          <>
            <TableComponent columns={columns} data={data} />
          
          </>
          :
          <Loader />
        }
      </div>
      <AreYouSureModal showModal={showModal} setShowModal={setShowModal} text={'Do you really want to delete this children?'} onOk={() => console.log('onOk')} />
    </LayoutComponent>
  )
}


