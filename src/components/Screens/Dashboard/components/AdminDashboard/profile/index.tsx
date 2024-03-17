'use client';
import React from 'react'
import LeftSideBar from '@/components/UI/Sidebar'
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar'
import SettingForm from './components/Form'
import { useAuth } from '@/hooks/useAuth'
import MainLayout from '@/components/UI/MainLayout';


const Setting = () => {
  const { updatePassword, isLoading } = useAuth();
  return (
    <div className='flex'>
					<LeftSideBar />
					<div className='w-full px-3 overflow-x-hidden'>
            <MainLayout>
            <DashboardNavbar title={"Settings"} setting={true}/>
            <SettingForm submitHandler={updatePassword} isLoading={isLoading}/>
            </MainLayout>
					
						</div>
					</div>
			
  )
}

export default Setting