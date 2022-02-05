import React, { useState, useEffect } from 'react'
import { Tag, Space, message, Typography, Input, Row, Col, Radio } from 'antd';
import { LayoutComponent, TableComponent, Loader } from '@components'
import { http } from '@services'
import "./housesStyles.css"

const { Title } = Typography

const { Search } = Input

export default function Houses() {

  const [search, setSearch] = useState()
  const [status, setStatus] = useState("vaccinated")

  const [data, setData] = useState([])

  async function getHouses() {
    const url = `admin/GET/houses/${status}`;

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
    getHouses()

  }, [status, search === ''])

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

  async function searchHouses() {
    const url = `admin/GET/search/houses/${search}`;

    const response = await http(url);

    if (response?.success) {
      setData(response?.data)
    }
    else {
      message.error("Something went wrong")
    }
  }


  return (
    <LayoutComponent>
      <div className="container">

        <Title className='heading'>Houses</Title>

        <Row className='mb-3' >
          <Col span={8}>
            <select value={status} className='select-status' onChange={(e) => setStatus(e.target.value)}>
              <option value="vaccinated">Vaccinated</option>
              <option value="rejected">Rejected</option>
            </select>
          </Col>

          <Col span={16}>
            <div className='houses-search-box-container'>
              <Search placeholder="Search houses with cnic" enterButton="Search" size="large" loading={false} className='search-input'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onSearch={() => searchHouses()}
              />

            </div>


          </Col>
        </Row>
        <TableComponent columns={columns} data={data} />

      </div>
    </LayoutComponent >
  )
}

// <Radio.Group name="radiogroup" defaultValue={1}>
//   <Radio value={'cnic'}>With cnic</Radio>
// </Radio.Group>