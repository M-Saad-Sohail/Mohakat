import React from 'react';
import RejectedSponsor from '@/components/Screens/Dashboard/components/AdminDashboard/Sponsor/Rejected';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Rejected Sponsors`
}


const Rejected = () => {
	const t = useTranslations('RejectedSponsors');
	return (
		<>
			<DashboardNavbar title={t('title')} />
			<div className="px-4">
				<RejectedSponsor />
			</div>
		</>
	);
};

export default Rejected;
