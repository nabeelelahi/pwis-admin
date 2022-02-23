import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useNavigate } from 'react-router'
import { CheckUser } from '@helpers'
import {AreYouSureModal} from "../../modals"
import './navStyles.css'

const { Title } = Typography

function Nav() {

    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    function logout() {
        window.localStorage.removeItem('uuid')
        navigate('/login')
    }
    useEffect(() => {
        setUser(CheckUser())
    },[])

    return (
        <header className="header">
            {
                user !== null && <div className='right-section'>
                    <button className='logout-btn' onClick={logout}>Logout</button>
                </div>
            }
            <AreYouSureModal/>
            <Title className='title'>Admin Panel</Title>
        </header>
    )
}

export default Nav
