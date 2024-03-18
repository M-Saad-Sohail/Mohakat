'use client';
import React, { useState, useEffect } from 'react';
import LeftSideBar from '@/components/UI/Sidebar';
import Table from '@/components/UI/Table';
import { PENDINGCOLUMN } from '@/contants';
import { fetchPendingData } from '@/hooks/useSponsorTables';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import fetchSponsorData from '@/components/Screens/Dashboard/utils/fetchSponsorData';

const PendingSponsor = () => {
	const [data, setData] = useState<any[]>([]);

	const init = async () => {
		const result = await fetchSponsorData(fetchPendingData);
		setData(result);
	};

	useEffect(() => {
		init();
	}, []);

	return <Table data={data} columns={PENDINGCOLUMN} search={true} />;
};

export default PendingSponsor;
