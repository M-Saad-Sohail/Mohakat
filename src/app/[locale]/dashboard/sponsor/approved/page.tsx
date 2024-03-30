import React from 'react';
import ApprovedTable from '@/components/Screens/Dashboard/components/AdminDashboard/Sponsor/Approved';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Approved Sponsors`
}

const Approved = () => {
	const t = useTranslations('ApprovedSponsors');
	return (
		<>
			<DashboardNavbar title={t('title')} />
			<div className="px-4">
				<ApprovedTable />
			</div>
		</>
	);
};

export default Approved;
