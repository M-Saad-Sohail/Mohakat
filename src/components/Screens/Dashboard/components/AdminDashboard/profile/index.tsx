import React from 'react'
import LeftSideBar from '@/components/UI/Sidebar'
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar'
import SettingForm from './components/Form'

const Setting = () => {
  return (
    <div className='flex'>
					<LeftSideBar />
					<div className='w-full px-3'>
						<DashboardNavbar title={"Settings"} setting={true}/>
            <SettingForm/>
						</div>
					</div>
			
  )
}

export default Setting