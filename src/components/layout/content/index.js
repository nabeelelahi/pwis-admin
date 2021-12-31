import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import './contentStyles.css';


const { Content } = Layout;

export default function MainContent({ children }) {

  return (

    <div className='main'>
      {children}
    </div>
  )
}


