'use client';
import React, { useEffect, useState } from 'react';
import Table from '@/components/ui/Table';
import { FAMILIESCOLUMN } from '@/contants';
import { fetchFamiliesData } from '@/hooks/useSponsorTables';
import useFetchFamilyData from '@/hooks/useFetchFamilyData';

const ManageFamily = () => {
	const { data, isLoading } = useFetchFamilyData(fetchFamiliesData);

	return (
		<Table
			data={data}
			columns={FAMILIESCOLUMN}
			tableName={'familySponser'}
			search={true}
		/>
	);
};

export default ManageFamily;
