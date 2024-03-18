import React from 'react';
import { dashboard } from '@/contants';
import InfoCards from '@/components/UI/Card';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import Image from 'next/image';
import { add_icon } from '@/assests';
import Table from '@/components/UI/Table';
import { DASHBOARDCOLUMN, DASHBOARDDATA } from '@/contants';
type CARD = {
	name: string;
	value: string;
};

const AdminDashboard = () => {
	return (
		<div className="w-full">
			<DashboardNavbar title={'Dashboard'} />
			<div className="text-primary px-4 flex gap-x-3 w-full my-4 flex-wrap mx-auto">
				{dashboard.map((item, index) => (
					<InfoCards
						key={index}
						heading={item.name}
						value={item.value}
						classname="flex-1 mb-2"
						valueclass="text-[32px] mt-4"
					/>
				))}
			</div>
			<div className="flex py-4 mobile:pt-4 w-full px-4">
				<h2 className="text-black text-[24px] flex items-center w-full my-4 font-bold">
					Admins & Moderators
				</h2>
				<div
					className="gap-x-4 flex flex-row w-fit min-w-[150px] text-white bg-primary  cursor-pointer rounded-md  border-main font-bold py-2 px-4  h-[50px] justify-center items-center"
					onClick={() => {
						// setDeleteOpenModal(true);
					}}
				>
					<Image src={add_icon} alt="alt" className="w-4 h-4" />
					<button className="text-[14px] text-white">Add User</button>
				</div>
			</div>
			<div className='px-4'>
				<Table data={DASHBOARDDATA} columns={DASHBOARDCOLUMN} />
			</div>
		</div>
	);
};

export default AdminDashboard;
