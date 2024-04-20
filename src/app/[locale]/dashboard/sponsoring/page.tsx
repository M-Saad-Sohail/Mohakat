import React from 'react';
import { ApprovedSponsors } from '@/components/screens';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import SponsoringFamilies from '@/components/screens/SponsoringFamilies';

export const metadata: Metadata = {
	title: `Sponsored Families`,
};

const Sponsoring = () => {
	const t = useTranslations('ApprovedSponsors');
	return (
		<>
			<DashboardNavbar title={t('title')} />
			<SponsoringFamilies />
		</>
	);
};

export default Sponsoring;
