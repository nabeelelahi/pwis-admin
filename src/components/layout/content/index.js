import React from 'react';
import { Layout } from 'antd';
import './contentStyles.css';



export default function MainContent({ children }) {

  return (

    <div className='main'>
      {children}
    </div>
  )
}


