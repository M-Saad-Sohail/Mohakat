'use client'
import React from 'react'
import MainLayout from '../../UI/MainLayout'
import LeftSideBar from '../../UI/Sidebar'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
type IProps={
  role:Boolean
}
const Dashboard = ({role}:IProps) => {
  return (
    <div className='flex'>
    <LeftSideBar/>
    <MainLayout>
      {role?<AdminDashboard/>:<UserDashboard/>}
    </MainLayout>
    </div>
  
  )
}

export default Dashboard