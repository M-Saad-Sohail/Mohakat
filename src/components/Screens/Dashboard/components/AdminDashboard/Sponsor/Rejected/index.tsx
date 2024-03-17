'use client';
import React, { useState, useEffect } from 'react';
import LeftSideBar from '@/components/UI/Sidebar';
import MainLayout from '@/components/UI/MainLayout';
import Table from '@/components/UI/Table';
import { REJECTEDCOLUMN, SPONSORDATA } from '@/contants';
import { fetchRejectededData } from '@/hooks/useSponsorTables';
import { getUserFromLocalStorage } from '@/utils/auth';
import NoData from '@/components/UI/NoData';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';

const RejectedSponsor = () => {
	const [rejectedData, setRejectedData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = getUserFromLocalStorage();
				if (!user) return;
				const data = await fetchRejectededData(user.key);
				setRejectedData(data?.sponsors || []); // Ensure data is an array or set default to empty array
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="flex">
			<LeftSideBar />
			<div className="w-full px-3 overflow-x-hidden">
				<MainLayout>
					<DashboardNavbar title={'Rejected Sponsor'} />
					
						<Table data={rejectedData} columns={REJECTEDCOLUMN} />
					
				</MainLayout>
			</div>
		</div>
	);
};

export default RejectedSponsor;
