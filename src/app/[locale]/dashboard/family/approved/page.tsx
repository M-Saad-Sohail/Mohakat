import React from 'react';
import { ApprovedSponsors } from '@/components/screens';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import ApprovedDetails from './approvedDetails'

export const metadata: Metadata = {
	title: `Approved Family`,
};

const Approved = () => {
	const t = useTranslations('ApprovedFamily');
	return (
		<>
			<DashboardNavbar title={t('title')} />
			<ApprovedDetails />
		</>
	);
};

export default Approved;
