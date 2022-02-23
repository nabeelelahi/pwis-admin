import React, { useState, useEffect } from 'react';
import { message, Row, Col } from 'antd';
import { LayoutComponent, DashboardCard } from '@components'
import { useNavigate } from 'react-router';
import { http } from '@services'
import WorkersIcon from '../../assets/workers.png';
import ChildrensIcon from '../../assets/childrens.png';
import HousesIcon from '../../assets/houses.png';
import VaccineDriveIcon from '../../assets/vaccine-drive.png';


export default function Dashboard() {

    const [houses, setHouses] = useState([])
    const [workers, setWorkers] = useState([])
    const [childrens, setChildrens] = useState([])
    const [vaccineDrives, setVaccineDrives] = useState([])

    const navigate = useNavigate()

    async function getHouses() {
        const url = `admin/GET/houses/vaccinated`;
        const response = await http(url);
        if (response?.success) {
            setHouses(response?.data)
        }
    }

    async function getWorkers() {
        const url = `admin/GET/all-workers`;
        const response = await http(url);
        if (response?.success) {
            setWorkers(response?.data)
        }
    }


    async function getChildrens() {
        const url = `admin/GET/children`;
        const response = await http(url);
        if (response?.success) {
            setChildrens(response?.data)
        }else{
            message.error('Someting went wrong')
        }
    }

    useEffect(() => {
        getWorkers()
        getHouses()
        getChildrens()
    }, [])

    return (
        <LayoutComponent>
            <div className="container pt-5">
                <Row gutter={[{ md: 20 }, 20]}>
                    <Col md={12} lg={12} xs={12} sm={24}>
                        <DashboardCard icon={WorkersIcon} title="Total Workers" bgColor="bg-orange" value={workers?.length} onClick={() => navigate('/workers')} />
                    </Col>
                    <Col md={12} lg={12} xs={12} sm={24}>
                        <DashboardCard icon={ChildrensIcon} title="Total Vaccinated Childrens" bgColor="bg-green" value={childrens?.length} onClick={() => navigate('/childrens')} />
                    </Col>
                    <Col md={12} lg={12} xs={12} sm={24}>
                        <DashboardCard icon={VaccineDriveIcon} title="Total Workers On Vaccine Drive" bgColor="bg-blue" value={vaccineDrives?.length} onClick={() => navigate('/vaccine-drive')} />
                    </Col>
                    <Col md={12} lg={12} xs={12} sm={24}>
                        <DashboardCard icon={HousesIcon} title="Total Completed Houses" bgColor="bg-purple" value={houses?.length} onClick={() => navigate('/houses')} />
                    </Col>
                </Row>
            </div>
        </LayoutComponent>
    )
}


