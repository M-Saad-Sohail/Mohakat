import React from 'react';
import { RejectedSponsors } from '@/components/screens';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Rejected Sponsors`
}


const Rejected = () => {
	const t = useTranslations('RejectedFamily');
	return (
		<>
			<DashboardNavbar title={t('title')} />
			<div className="px-4">
				<RejectedSponsors />
			</div>
		</>
	);
};

export default Rejected;
