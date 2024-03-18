'use client';
import React, { useState, useEffect } from 'react';
import Table from '@/components/UI/Table';
import { REJECTEDCOLUMN, SPONSORDATA } from '@/contants';
import { fetchRejectededData } from '@/hooks/useSponsorTables';
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
		<Table
			data={data}
			columns={REJECTEDCOLUMN}
			search={true}
			setData={setData}
		/>
	);
};

export default RejectedSponsor;
