import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Typography, message, } from 'antd';
import { http } from "@services"

const { Title } = Typography

const { Option } = Select;

export default function UpdateWorkerForm() {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        setLoading(true)
        const url = "someroute"
        const options = {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'content-type': 'application/json'
            }
        }

        const response = http(url, options)
        if (response?.success) {
            message.success('Congratulations! Account Has Been Successfully created!')
            setLoading(false)
        } else {
            setLoading(false)
            message.error('Something went wrong!')

        }
    }
    const state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cnic: '',
        gender: '',
        address: '',
        city: '',
        district: '',
        postalCode: '',
    }

    return (
        <div>
            <Title className='form-title'>Update Worker</Title>
            <Form
                form={form}
                name="update-worker"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    phone: state.phone,
                    cnic: state.cnic,
                    gender: state.gender,
                    address: state.address,
                    city: state.city,
                    district: state.district,
                    postalCode: state.postalCode,


                }}
                scrollToFirstError
            >
                <Row gutter={[{ xl: 50, lg: 30, md: 20, sm: 15, xs: 0 }, 0]}>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}

                        >
                            <Input placeholder='Enter first name ' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter last name ' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter email ' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter phone ' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="cnic"
                            label="CNIC"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter cnic ' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Select placeholder="Enter gender " >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder="Enter address " />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="city"
                            label="City"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder="Enter city " />
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
                            <Input placeholder="Enter district " />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="postalCode"
                            label="Postal Code"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder="Enter postal code " />
                        </Form.Item>
                    </Col>

                    <Col xs={24} lg={24} md={24} sm={24}>
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" className='custom-btn'>
                                Update
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

