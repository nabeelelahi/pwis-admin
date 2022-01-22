import React, { useState, useEffect } from 'react';
import { message, Space, Tag, Typography, Avatar, Image, Input, Row, Col } from 'antd';
import { LayoutComponent, TableComponent, Loader, AreYouSureModal, DashboardCard } from '@components'
import { useNavigate } from 'react-router';
import { http } from '@services'
import WorkersIcon from '../../assets/workers.png';
import ChildrensIcon from '../../assets/childrens.png';
import HousesIcon from '../../assets/houses.png';
import VaccineDriveIcon from '../../assets/vaccine-drive.png';


const { Title } = Typography

const { Search } = Input

export default function Dashboard() {

    const [showModal, setShowModal] = useState(false)

    const [search, setSearch] = useState([])

    const navigate = useNavigate()

    const data = null

    //   const [data, setData] = useState([
    //     { key: 12123, firstName: 'ABC', lastName: 'XYZ', email: 'abcxyz@gmail.com', phone: '031xxxx', cnic: '42101-2689780-8', status: 'ACTIVE', address: 'xyz', city: 'Karachi', district: 'Central', gender: 'male' },
    //     { key: 12121, firstName: 'ABC', lastName: 'XYZ', email: 'abcxyz@gmail.com', phone: '031xxxx', cnic: '42101-2689780-8', status: 'ACTIVE', address: 'abc', city: 'Karachi', district: 'Central', gender: 'female' },
    //   ])

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




    return (
        <LayoutComponent>
            <div className="container pt-5">
                <Row gutter={[{ md: 20 }, 20]}>
                    <Col md={12}>
                        <DashboardCard icon={WorkersIcon} title="Total Workers" bgColor="bg-orange" value={2344} />
                    </Col>
                    <Col md={12}>
                        <DashboardCard icon={ChildrensIcon} title="Total Vaccinated Childrens" bgColor="bg-green" value={2344} />
                    </Col>
                    <Col md={12}>
                        <DashboardCard icon={VaccineDriveIcon} title="Total Workers On Vaccine Drive" bgColor="bg-blue" value={2344} />
                    </Col>
                    <Col md={12}>
                        <DashboardCard icon={HousesIcon} title="Total Remaining Houses" bgColor="bg-purple" value={2344} />
                    </Col>
                </Row>
            </div>
            <AreYouSureModal showModal={showModal} setShowModal={setShowModal} text={'Do you really want to delete this worker?'} onOk={() => console.log('onOk')} />
        </LayoutComponent>
    )
}


