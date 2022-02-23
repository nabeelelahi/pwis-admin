import React, { useEffect, useState } from 'react';
import { Tag, Space, message, Typography, Input, Radio } from 'antd';
import { LayoutComponent, TableComponent, AreYouSureModal } from '@components'
import { http } from '@services'
import { useNavigate } from 'react-router';
import moment from "moment"
import "./childrenStyles.css"

const { Title } = Typography

const { Search } = Input

export default function Childrens() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const [searchType, setSearchType] = useState('cnic')

  const [data, setData] = useState([])

  async function getChildrens() {
    const url = `admin/GET/children`;

    const response = await http(url);

    if (response?.success) {
      setData(response?.data)
    }
    else {
      message.error('Something went wrong')
    }

  }
  async function deleteChildren() {
    const url = `admin/DELETE/delete-children/${deletingId}`;
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }

    const response = await http(url, options);

    if (response?.success) {
      message.success('Children deleted successfully')
      await getChildrens()
      setShowModal(false)
    }
    else {
      message.error('Something went wrong')
    }

  }

  useEffect(() => {
    getChildrens()
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
    },
    {
      title: 'First Name',
      dataIndex: 'First_name',
      key: 'First_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'Last_name',
      key: 'Last_name',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: 'Age',
      dataIndex: 'Age',
      key: 'Age',
    },

    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
    },
    {
      title: 'Family No',
      dataIndex: 'Family_Number',
      key: 'Family_Number',
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',
    },
    {
      title: 'Parent CNIC',
      dataIndex: 'Parent_cnic',
      key: 'Parent_cnic',
    },
    {
      title: 'Vaccination Status',
      dataIndex: 'Vaccination_status',
      key: 'Vaccination_status',
      render: (text, record) => (
        <Space className='center-status-tag'>
          <Tag className={`${text === 'Vaccinated' && 'done' || text === 'In Process' && 'in-progress'}`}>{text}</Tag>
        </Space>
      )
    },
    {
      title: 'Next Vaccination Date',
      dataIndex: 'Next_Vaccination_date',
      key: 'Next_Vaccination_date',
      render:(text)=>{
        return moment(text).format("DD MMM YYYY")
      }
    },
    {
      title: 'Actions',
      key: 'action',
      dataIndex: 'status',
      render: (text, record) => (
        <Space size="middle">
          <Tag color={'green'} onClick={() => navigate('/update-children', { state: record })}>Edit</Tag>
          <Tag color={'red'} onClick={() => {
            setDeletingId(record?._id)
            setShowModal(true)
          }}>Delete</Tag>
        </Space>
      ),
      fixed: 'right'
    },
  ]

  async function searchChildrens() {
    const url = `admin/GET/search/children`;
    let params = searchType ==='cnic' && {Parent_cnic:search} || searchType ==='familyNo' &&{Family_Number:search}
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


  return (
    <LayoutComponent>
      <div className="container">
        <Title className='heading'>Childrens</Title>
        <div className='mb-3 search-box-container'>
          <Search placeholder="Search childrens" enterButton="Search" size="large" loading={false} className='search-input'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onSearch={() => searchChildrens()}
          />
          <Radio.Group name="radiogroup" value={searchType} onChange={(e)=>setSearchType(e.target.value)}>
            <Radio value={'cnic'}>With cnic</Radio>
            <Radio value={'familyNo'}>With Family No</Radio>
          </Radio.Group>
        </div>
        <TableComponent columns={columns} data={data} />
      </div>
      <AreYouSureModal showModal={showModal} setShowModal={setShowModal} text={'Do you really want to delete this children?'} onOk={() => deleteChildren()} />
    </LayoutComponent>
  )
}


