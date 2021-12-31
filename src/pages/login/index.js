import { Col, Row, Form, Input, Button, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { LoginForm, LayoutComponent } from '@components'
import "./loginStyles.css"

export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        const admin = sessionStorage.getItem('uuid')
        if (admin) {
            navigate("/")
        }
    }, [])



    return (
        <LayoutComponent>
            <div className='container'>
                <LoginForm />
            </div>

        </LayoutComponent>
    )
}


