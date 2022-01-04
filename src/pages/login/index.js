import React, { useEffect } from 'react'
import { LoginForm, LayoutComponent } from '@components'
import "./loginStyles.css"

export default function Login() {


    return (
        <LayoutComponent>
            <div className='container'>
                <LoginForm />
            </div>
        </LayoutComponent>
    )
}


