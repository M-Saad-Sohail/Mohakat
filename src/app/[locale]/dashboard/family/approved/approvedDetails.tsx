'use client';
import React from 'react';
import { ApprovedSponsors } from '@/components/screens';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import Table from '@/components/ui/Table';
import { FAMILIESCOLUMN } from '@/contants';
import { fetchApprovedFamiliesData } from '@/hooks/useSponsorTables';
import useFetchFamilyData from '@/hooks/useFetchFamilyData';


const ApprovedDetails = () => {
    const t = useTranslations('ApprovedFamily');
    const { data, isLoading, refetch } = useFetchFamilyData(fetchApprovedFamiliesData);

    const handleTableRefresh = () => {
        refetch();
    };

    return (
        <>
            <Table
                data={data}
                columns={FAMILIESCOLUMN}
                tableName={'familySponser'}
                search={true}
                onTableRefresh={handleTableRefresh}
            />
        </>
    )



}

export default ApprovedDetails;