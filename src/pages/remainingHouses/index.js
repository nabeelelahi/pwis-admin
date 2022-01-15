import React, { useState, useEffect } from 'react'
import { Tag, Space, message, Typography, Input } from 'antd';
import { LayoutComponent, TableComponent, Loader } from '@components'
import { http } from '@services'

const { Title } = Typography

const { Search } = Input

export default function RemainingHouses() {

  const [search, setSearch] = useState([])

  const [data, setData] = useState([
    { key:111,city: 'Karachi', district: 'central', area: 'North Karachi',sector:'11-B',houseNo:'123'},
    { key:222,city: 'Karachi', district: 'central', area: 'North Karachi',sector:'11-A',houseNo:'124'},
    
  ])

  // async function getRemainingHouses() {
  //   const url = `admin/GET/remaining-houses`;

  //   const response = await http(url);

  //   if (response?.success) {
  //     setData(response.data)
  //   }
  //   else {
  //     message.error("Something went wrong")
  //   }

  // }

  // useEffect(() => {
  //   getRemainingHouses()

  // }, [])

  const columns = [
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
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 'sector',
    },
    {
      title: 'House No',
      dataIndex: 'houseNo',
      key: 'houseNo',
    },
    
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'status',
      render: (text, record) => (
        <Space size="middle">
          <Tag color={'green'} >Done</Tag>
        </Space>
      ),
    },
  ]

  return (
    <LayoutComponent>
      <div className="container">

        <Title className='heading'>Remaining Houses</Title>
        <div className='mb-3 search-box-container' >
        <Search placeholder="Search remaining houses" enterButton="Search" size="large" loading={false} className='search-input mr-3'
          onChange={(e) => console.log(e.target.value)}
          value={search}

        />
      </div>
    
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
