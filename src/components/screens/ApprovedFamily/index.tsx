'use client';
import React from 'react';
import Table from '@/components/ui/Table';
import { APPROVEDCOLUMN } from '@/contants';
import { fetchApprovedData } from '@/hooks/useSponsorTables';
import useFetchSponsors from '@/hooks/useFetchSponsors';

const ApprovedSponsors = () => {
	const { data } = useFetchSponsors(fetchApprovedData);
	return (
		<div className="px-4">
			<Table data={data} columns={APPROVEDCOLUMN} search={true} />;
		</div>
	);
};

export default ApprovedSponsors;
