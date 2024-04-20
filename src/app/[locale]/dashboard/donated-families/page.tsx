import React from 'react';
import { ApprovedSponsors } from '@/components/screens';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import DonatedFamilies from '@/components/screens/DonatedFamilies';

export const metadata: Metadata = {
	title: `Donated Families`,
};

const FamiliesDonated = () => {
	const t = useTranslations('DonatedFamilies');
	return (
		<>
			<DashboardNavbar title={t('title')} />
			<DonatedFamilies />
		</>
	);
};

export default FamiliesDonated;
