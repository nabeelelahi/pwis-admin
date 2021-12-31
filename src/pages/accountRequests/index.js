import React, { useState, useEffect } from 'react';
import { message, Tag, Typography } from 'antd';
import { http } from "@services"
import { LayoutComponent, TableComponent, Loader } from '@components'

const { Title } = Typography

export default function AccountRequests() {

  const [requests, setRequests] = useState([])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'CNIC',
      dataIndex: 'CNIC',
      key: 'CNIC',
    },
    {
      title: 'Status',
      key: 'email',
      dataIndex: 'email',
      render: (text, record) => {

        if (requests.length == 0) {
          return (
              <Tag onClick={() => acceptAccountRequest(text)} color={'green'}>
                Accept
              </Tag>
          )
        }
      }
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
      console.log(response)
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


