'use client';
import React from 'react';
import Table from '@/components/ui/Table';
import { FAMILIESCOLUMN, PENDINGFAMILIESCOLUMN } from '@/contants';
import { fetchPendingFamiliesData } from '@/hooks/useSponsorTables';
import useFetchFamilyData from '@/hooks/useFetchFamilyData';

const PendingSponsor = () => {
	
	const { data, isLoading, refetch } = useFetchFamilyData(fetchPendingFamiliesData);

	const handleTableRefresh = () => {
        refetch();
    };

	

	return (
		<>
		<Table
                data={data}
                columns={PENDINGFAMILIESCOLUMN}
                tableName={'familySponser'}
                search={true}
                onTableRefresh={handleTableRefresh}
            />
			</>
	)
};

export default PendingSponsor;
