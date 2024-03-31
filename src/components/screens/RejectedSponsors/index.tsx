'use client';
import React, { useState, useEffect } from 'react';
import Table from '@/components/ui/Table';
import { REJECTEDCOLUMN, SPONSORDATA } from '@/contants';
import { fetchRejectededData } from '@/hooks/useSponsorTables';
import useFetchSponsors from '@/hooks/useFetchSponsors';

const RejectedSponsor = () => {
	const { data, setData } = useFetchSponsors(fetchRejectededData)
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
