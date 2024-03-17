'use client';
import React, { useState, useEffect } from 'react';
import LeftSideBar from '../../../../../../UI/Sidebar';
import MainLayout from '../../../../../../UI/MainLayout';
import Table from '../../../../../../UI/Table';
import { PENDINGCOLUMN } from './../../../../../../../contants';
import { fetchPendingData } from './../../../../../../../hooks/useSponsorTables';
import { getUserFromLocalStorage } from '../../../../../../../utils/auth';
import NoData from '@/components/UI/NoData';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
const PendingSponsor = () => {
	const [pendingData, setPendingData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = getUserFromLocalStorage();
				if (!user) return;
				const data = await fetchPendingData(user.key);
				setPendingData(data?.sponsors || []); // Ensure data is an array or set default to empty array
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
					<DashboardNavbar title={'Pending Sponsors'} />
					{pendingData.length > 0 ? (
						<Table data={pendingData} columns={PENDINGCOLUMN} />
					) : (
						<NoData />
					)}
				</MainLayout>
			</div>
		</div>
	);
};

export default PendingSponsor;
