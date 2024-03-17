'use client';
import React, { useState, useEffect } from 'react';
import LeftSideBar from '@/components/UI/Sidebar';
import MainLayout from '@/components/UI/MainLayout';
import Table from '@/components/UI/Table';
import { APPROVEDCOLUMN } from '@/contants';
import { fetchApprovedData } from '@/hooks/useSponsorTables';
import { getUserFromLocalStorage } from '@/utils/auth';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import NoData from '@/components/UI/NoData';
const Approved = () => {
	const [approvedData, setApprovedData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = getUserFromLocalStorage();
				if (!user) return;
				const data = await fetchApprovedData(user.key);
				setApprovedData(
					data?.simplifiedSponsors.filter(
						(sponsor: any) => sponsor.name !== 'Super Admin',
					) || [],
				); // Ensure data is an array or set default to empty array
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
					<DashboardNavbar title={'Approved Sponsors'} />
					{approvedData.length > 0 ? (
						<Table data={approvedData} columns={APPROVEDCOLUMN} />
					) : (
						<NoData />
					)}
				</MainLayout>
			</div>
		</div>
	);
};

export default Approved;
