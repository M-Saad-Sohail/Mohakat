'use client';
import React, { useState, useEffect } from 'react';
import LeftSideBar from '@/components/UI/Sidebar';
import Table from '@/components/UI/Table';
import { APPROVEDCOLUMN } from '@/contants';
import { fetchApprovedData } from '@/hooks/useSponsorTables';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import fetchSponsorData from '@/components/Screens/Dashboard/utils/fetchSponsorData';

const Approved = () => {
	const [data, setData] = useState<any[]>([]);

	const init = async () => {
		const result = await fetchSponsorData(fetchApprovedData);
		setData(result);
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div className="flex bg-[#f4f4f4ea]">
			<LeftSideBar />
			<div className="w-full px-3 overflow-x-hidden">
				<DashboardNavbar title={'Approved Sponsors'} />
				<div className='px-4'> 
					<Table data={data} columns={APPROVEDCOLUMN} search={true} />
				</div>
			</div>
		</div>
	);
};

export default Approved;
