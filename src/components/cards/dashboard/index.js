import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import "./dashboardCardStyles.css"


const { Title } = Typography

export default function DashboardCard({icon, title, value, bgColor}) {
    return (
        <Card hoverable className={`dashboard-card ${bgColor}`}>
            <div className='dashboard-card-content' >
                <Title className="card-title">{title}</Title>
                <div>
                    <Row>
                        <Col md={14} >
                            <div className='card-icon'>
                                <img src={icon} alt="" className='card-img' />
                            </div>
                        </Col>
                        <Col md={10}>
                            <div className='d-flex align-items-center h-100 justify-content-center' >
                                <h3 className='text-white font-28'>{value}</h3>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        </Card>
    );
}


