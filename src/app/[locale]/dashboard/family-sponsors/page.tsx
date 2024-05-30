import React from 'react';
import { ApprovedSponsors } from '@/components/screens';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import FamilySponsorData from '@/components/screens/FamilySponsorData';

export const metadata: Metadata = {
	title: `Family Sponsor`,
};

const FamilySponsor = () => {
	const t = useTranslations('SponsoredFamilies');
	return (
		<>
			<DashboardNavbar title={t('title')} />
			<FamilySponsorData />
		</>
	);
};

export default FamilySponsor;
