import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Typography, message, } from 'antd';
import { http } from "@services"
import { useLocation, useNavigate } from 'react-router';

const { Title } = Typography

export default function UpdateHouseForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const state = useLocation().state

    async function onFinish(values) {
        setLoading(true)
        const url = "admin/PUT/update-house"
        let params = {
            ...values,
            _id: state?._id
        }
        const options = {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json'
            }
        }

        const response = await http(url, options)
        if (response?.success) {
            message.success('House updated successfully')
            setLoading(false)
            navigate(-1)

        } else {
            message.error('Something went wrong!')
            setLoading(false)
        }
    }

    return (
        <div>
            <Title className='form-title'>Update Worker</Title>
            <Form
                form={form}
                name="update-house"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    city: state?.city,
                    district: state?.district,
                    area: state?.area,
                    sector: state?.sector,
                    house_no: state?.house_no,
                    parent_cnic: state?.parent_cnic,
                    no_of_children: state?.no_of_children,
                    worker_email: state?.worker_email,
                    Vac_Status: state?.Vac_Status
                }}
                scrollToFirstError
            >
                <Row gutter={[{ xl: 50, lg: 30, md: 20, sm: 15, xs: 0 }, 0]}>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="city"
                            label="City"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}

                        >
                            <Input placeholder='Enter city' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="district"
                            label="District"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter district' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="area"
                            label="Area"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter area' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="sector"
                            label="Sector"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter sector ' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="house_no"
                            label="House No"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter house no' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="parent_cnic"
                            label="Parent Cnic"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter parent cnic' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="no_of_children"
                            label="No Of Childrens"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter no of childrens' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="worker_email"
                            label="Worker Email"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter worker email' />
                        </Form.Item>
                    </Col>

                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="Vac_Status"
                            label="Vaccination Status"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Select placeholder="Enter vaccination status" >
                                <Option value="Vaccinated">Vaccinated</Option>
                                <Option value="Rejected">Rejected</Option>
                                <Option value="In Process">In Process</Option>
                                <Option value="Empty">Empty</Option>
                                <Option value="Children Free">Children Free</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} lg={24} md={24} sm={24}>
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" className='custom-btn mt-1'>
                                Update
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

