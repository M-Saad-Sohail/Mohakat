import React from 'react';
import { ApprovedSponsors } from '@/components/screens';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Approved Sponsors`,
};

const Approved = () => {
	const t = useTranslations('ApprovedSponsors');
	return (
		<>
			<DashboardNavbar title={t('title')} />
			<ApprovedSponsors />
		</>
	);
};

export default Approved;
