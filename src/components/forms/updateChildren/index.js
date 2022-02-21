import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Typography, message, } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { http } from "@services"
import moment from 'moment';

const { Title } = Typography

const { Option } = Select;

export default function UpdateChildrenForm() {

    const state = useLocation().state

    const navigate = useNavigate()

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    async function onFinish(values) {
        setLoading(true)
        values.Next_Vaccination_date=moment(values.Next_Vaccination_date).format("DD MMM YYYY")
        let params = {
            ...values,
            _id: state?._id
        }

        const url = "admin/PUT/update-children"
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(params)
        }

        const response = await http(url, options)
        if (response?.success) {
            setLoading(false)
            message.success(response?.message)
            navigate(-1)
        } else {
            message.error('Something went wrong!')
            setLoading(false)
        }
    }


    console.log('ss', state)

    return (
        <div>
            <Title className='form-title'>Update Children</Title>
            <Form
                form={form}
                name="add-children"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    First_name: state.First_name,
                    Last_name: state.Last_name,
                    Phone: state.Phone,
                    Parent_cnic: state.Parent_cnic,
                    Gender: state.Gender,
                    Age: state.Age,
                    Address: state.Address,
                    Vaccination_status: state.Vaccination_status,
                    Family_Number: state.Family_Number,
                    Previous_house: state.Previous_house,
                    Next_Vaccination_date: state.Next_Vaccination_date
                }}
                scrollToFirstError
            >
                <Row gutter={[{ xl: 50, lg: 30, md: 20, sm: 15, xs: 0 }, 0]}>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            className='label'
                            name="First_name"
                            label="First Name"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}

                        >
                            <Input placeholder='Enter first name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            className='label'
                            name="Last_name"
                            label="Last Name"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter last name' />
                        </Form.Item>
                    </Col>

                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            className='label'
                            name="Age"
                            label="Age"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter age' />
                        </Form.Item>
                    </Col>


                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="Gender"
                            label="Gender"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Select placeholder="Enter gender" >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="Phone"
                            label="Phone"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder='Enter phone' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="Parent_cnic"
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
                            name="Address"
                            label="Address"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder="Enter address" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="Vaccination_status"
                            label="Vaccination Status"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Select >
                                <Option value="In Process">In Process</Option>
                                <Option value="Vaccinated">Vaccinated</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="Family_Number"
                            label="Family No"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input placeholder="Enter family number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} lg={12} md={12} sm={12}>
                        <Form.Item
                            name="Next_Vaccination_date"
                            label="Next Vaccination Date"
                            rules={[
                                { required: true, message: 'This field is required' }
                            ]}
                        >
                            <Input type="date" placeholder="Enter next vaccination date" />
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

