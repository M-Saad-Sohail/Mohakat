import React from 'react';
import { PendingSponsors } from '@/components/screens';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Pending Sponsors`
}

const Pending = () => {
	const t = useTranslations('PendingSponsors');

	return (
		<>
			<DashboardNavbar title={t('title')} />
			<div className="px-4">
				<PendingSponsors />
			</div>
		</>
	);
};

export default Pending;
