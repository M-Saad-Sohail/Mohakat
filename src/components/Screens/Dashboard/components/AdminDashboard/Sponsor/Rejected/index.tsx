'use client'
import React, { useState, useEffect } from 'react';
import LeftSideBar from 'components/UI/Sidebar@/';
import MainLayout from '@/components/UI/MainLayout';
import Table from '@/components/UI/Table';
import { REJECTEDCOLUMN, SPONSORDATA } from '@/contants';
import { fetchRejectededData } from '@/hooks/useSponsorTables';
import { getUserFromLocalStorage } from '@/utils/auth';

const RejectedSponsor = () => {
	const [rejectedData, setRejectedData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = getUserFromLocalStorage();
				if (!user) return;
				const data = await fetchRejectededData(user.key);
				setRejectedData(data?.simplifiedSponsors || []); // Ensure data is an array or set default to empty array
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<div>
			<div className="flex">
				<LeftSideBar />
				<MainLayout>
					<div className="px-4">
					<h2 className="text-black text-[56px]  flex items-center my-4 font-bold">
							Rejected Sponsors
						</h2>
						<Table data={rejectedData} columns={REJECTEDCOLUMN} />
					</div>
				</MainLayout>
			</div>
		</div>
	);
};

export default RejectedSponsor;
