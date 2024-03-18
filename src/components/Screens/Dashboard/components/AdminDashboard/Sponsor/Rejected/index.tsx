'use client';
import React, { useState, useEffect } from 'react';
import LeftSideBar from '@/components/UI/Sidebar';
import Table from '@/components/UI/Table';
import { REJECTEDCOLUMN, SPONSORDATA } from '@/contants';
import { fetchRejectededData } from '@/hooks/useSponsorTables';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import fetchSponsorData from '@/components/Screens/Dashboard/utils/fetchSponsorData';

const RejectedSponsor = () => {
	const [data, setData] = useState<any[]>([]);

	const init = async () => {
		const result = await fetchSponsorData(fetchRejectededData);
		setData(result);
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div className="flex bg-[#f4f4f4ea]">
			<LeftSideBar />
			<div className="w-full px-3 overflow-x-hidden">
				<DashboardNavbar title={'Rejected Sponsor'} />
				<div className="px-4">
					<Table
						data={data}
						columns={REJECTEDCOLUMN}
						search={true}
						setData={setData}
					/>
				</div>
			</div>
		</div>
	);
};

export default RejectedSponsor;
