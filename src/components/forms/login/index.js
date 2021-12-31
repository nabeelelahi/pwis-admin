import React from "react";
import { Row, Col, Form, message, Input } from "antd"
import { useNavigate } from "react-router";
import { http } from '@services'
import './loginFormStyles.css'


export default function LoginForm() {

    const navigate = useNavigate()

    async function onFinish(values) {

        const url = 'admin/POST/login'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }

        const response = await http(url, options);

        if (response?.success) {
            sessionStorage.setItem("admin", JSON.stringify(response.data))
            navigate('/')

        }
        else {
            message.error("Either Email or Password is Incorrect")
        }
    };



    return (
        <Row>
            <Col lg={{ span: 12, offset: 6 }} md={{ span: 12, offset: 6 }} sm={{ span: 16, offset: 4 }} xs={24}>
                <div className="login-card">
                    <h1 className="login-heading">Login</h1>
                    <Form
                        className="login-form"
                        name="basic"
                        layout='vertical'
                        onFinish={onFinish}
                        scrollToFirstError
                    // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            className="input-item"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input className="input" placeholder="Enter email here" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            className="input-item"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password className="input" placeholder="Enter password here" />
                        </Form.Item>

                        <Form.Item>
                            <button className="login-button" type="submit">
                                Submit
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>

        </Row>
    )
}