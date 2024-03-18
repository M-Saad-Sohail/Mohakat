import React from 'react';
import Approved from '@/components/Screens/Dashboard/components/AdminDashboard/Sponsor/Approved';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';

const index = () => {
	const t = useTranslations('ApprovedSponsors');
	return (
		<>
			<DashboardNavbar title={t('title')} />
			<div className="px-4">
				<Approved />
			</div>
		</>
	);
};

export default index;
