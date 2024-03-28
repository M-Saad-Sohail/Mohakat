import React from 'react';
import PendingSponsor from '@/components/Screens/Dashboard/components/AdminDashboard/Sponsor/Pending';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';

const Pending = () => {
	const t = useTranslations('PendingSponsors');

	return (
		<>
			<DashboardNavbar title={t('title')} />
			<div className="px-4">
				<PendingSponsor />
			</div>
		</>
	);
};

export default Pending;
