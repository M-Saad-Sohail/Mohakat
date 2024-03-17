
import React from 'react';
import { dashboard } from '@/contants';
import InfoCards from '@/components/UI/Card';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import Image from 'next/image';
import { add_icon } from '@/assests';
import Table from '@/components/UI/Table';
import { DASHBOARDCOLUMN,DASHBOARDDATA } from '@/contants';
type CARD = {
	name: string;
	value: string;
};

const AdminDashboard = () => {
	return (
		<div className="w-full px-4">
			<DashboardNavbar title={'Dashboard'} />
			<div className="text-primary flex gap-x-2 w-full my-4 flex-wrap mx-auto">
				{dashboard.map((item, index) => (
					<InfoCards
						key={index}
						heading={item.name}
						value={item.value}
						classname="min-w-[360px] py-4  mx-3 "
						valueclass="text-[50px] py-2 mt-4"
					/>
				))}
			</div>
			<div className="flex py-4 mobile:pt-4 w-full px-4">
				<h2 className="text-black text-[36px] flex items-center w-full  my-4 font-bold">
					Admins & Moderators
				</h2>
				<div
					className="gap-x-4 min-w-[180px] mx-3 flex text-white bg-primary  cursor-pointer rounded-md  border-main font-bold py-3 px-4  h-[65px] justify-center items-center"
					onClick={() => {
						// setDeleteOpenModal(true);
					}}
				>
					<Image
						src={add_icon}
						alt="alt"
						className="w-6 h-6"
					/>
					<button className="text-base">Add Role</button>
				</div>
			</div>
			<div>
			<Table data={DASHBOARDDATA} columns={DASHBOARDCOLUMN}/> 
			</div>
		</div>
	);
};

export default AdminDashboard;
