import React, { useState, useEffect } from 'react'
import { Tag, Space, message, Typography, Input, Row, Col, Radio } from 'antd';
import { LayoutComponent, TableComponent, Loader, AreYouSureModal } from '@components'
import { http } from '@services'
import "./housesStyles.css"
import { useNavigate } from 'react-router';

const { Title } = Typography

const { Search } = Input

export default function Houses() {
  const navigate = useNavigate()

  const [search, setSearch] = useState()
  const [status, setStatus] = useState("Vaccinated")
  const [deleteId, setDeleteId] = useState("")
  const [showModal, setShowModal] = useState(false)


  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  async function getHouses() {
    const url = `admin/GET/houses`;

    const response = await http(url);

    if (response?.success) {
      setData(response?.data)
      statusRecords(response?.data,status)
    }
    else {
      message.error("Something went wrong")
    }

  }


  async function deleteHouse() {
    const url = `admin/DELETE/delete-house/${deleteId}`
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    }

    const response = await http(url, options)
    if (response?.success) {
      message.success(response?.message)
      getHouses()
      setShowModal(false)
    } else {
      message.error('Something went wrong!')

    }
  }



  useEffect(() => {
    getHouses()

  }, [search === ''])

  function statusRecords(d,e) {
    setFilteredData(d?.filter(item => item?.Vac_Status === e))

  }

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
      dataIndex: 'house_no',
      key: 'house_no'
    },
    {
      title: 'No Of Childrens',
      dataIndex: 'no_of_children',
      key: 'no_of_children'
    },
    {
      title: 'Parent Cnic',
      dataIndex: 'parent_cnic',
      key: 'parent'
    },
    {
      title: 'Worker Email',
      dataIndex: 'worker_email',
      key: 'worker_email'
    },
    {
      title: 'Actions',
      key: 'action',
      dataIndex: 'status',
      render: (text, record) => (
        <Space size="middle">
          <Tag color={'green'} onClick={() => navigate('/update-house', { state: record })} >Edit</Tag>
          <Tag color={'red'} onClick={() => {
            setDeleteId(record?._id)
            setShowModal(true)
          }} >Delete</Tag>
        </Space>
      ),
    },
  ]

  async function searchHouses() {
    const url = `admin/GET/search/houses`;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        cnic: search

      })

    }
    const response = await http(url, options);

    if (response?.success) {
      console.log('Res', response)
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
            <select value={status} className='select-status' onChange={(e) => {
              setStatus(e.target.value)
              statusRecords(data,e.target.value)

            }}>
              <option value="Vaccinated">Vaccinated</option>
              <option value="Rejected">Rejected</option>
              <option value="In Process">In Process</option>
              <option value="Empty">Empty</option>
              <option value="Children Free">Children Free</option>
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
        <TableComponent columns={columns} data={filteredData}
          onRow={(record, rowIndex) => {
            return {
              onClick: e => { console.log('eee', record) },
            };
          }}

        />

      </div>
      <AreYouSureModal showModal={showModal} setShowModal={setShowModal} text={'Do you really want to delete this house?'} onOk={() => deleteHouse()} />
    </LayoutComponent>
  )
}
