'use client';
import React from 'react'
import LeftSideBar from '@/components/UI/Sidebar'
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar'
import SettingForm from './components/Form'
import { useAuth } from '@/hooks/useAuth'


const Setting = () => {
  const { updatePassword, isLoading } = useAuth();
  return (
    <div className='flex'>
					<LeftSideBar />
					<div className='w-full px-3 overflow-x-hidden'>
						<DashboardNavbar title={"Settings"} setting={true}/>
            <SettingForm submitHandler={updatePassword} isLoading={isLoading}/>
						</div>
					</div>
			
  )
}

export default Setting