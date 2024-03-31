'use client';
import React from 'react';
import Table from '@/components/ui/Table';
import { PENDINGCOLUMN } from '@/contants';
import { fetchPendingData } from '@/hooks/useSponsorTables';
import useFetchSponsors from '@/hooks/useFetchSponsors';

const PendingSponsor = () => {
	const { data, isLoading } = useFetchSponsors(fetchPendingData);

	return <Table data={data} columns={PENDINGCOLUMN} search={true} />;
};

export default PendingSponsor;
