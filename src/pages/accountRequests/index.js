import React, { useState, useEffect } from 'react';
import { message, Tag, Typography, Space, Avatar, Image } from 'antd';
import { http } from "@services"
import { LayoutComponent, TableComponent, Loader } from '@components'

const { Title } = Typography

export default function AccountRequests() {

  const [requests, setRequests] = useState([])

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


  useEffect(() => {
    getAccountRequests()
  }, [])

  async function getAccountRequests() {
    const url = 'admin/GET/account-requests';

    const response = await http(url);

    if (response?.success) {
      setRequests(response.data)
    }
    else {
      if (response?.message === 'No requests found') {
        setRequests([])
      } else
        message.error('Something went wrong')
    }

  }

  async function acceptAccountRequest(text) {

    const url = `admin/PUT/accept-request`;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(text)
    };

    const response = await http(url, options);

    if (response?.success) {
      message.success("Account Request Approved");
      getAccountRequests()
    }
    else {
      message.error("Something went wrong");
      getAccountRequests()
    }

  }

  return (
    <LayoutComponent>
      <div className="container">
        <Title className='heading'>Account Requests</Title>
        {requests ?
          <TableComponent columns={columns} data={requests} />
          :
          <Loader />
        }
      </div>
    </LayoutComponent>

  )
}


