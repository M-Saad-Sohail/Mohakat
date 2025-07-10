import React from 'react';
import { PendingFamily } from '@/components/screens';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Pending Sponsors`
}

const Pending = () => {
	const t = useTranslations('PendingFamily');

	return (
		<>
			<DashboardNavbar title={t('title')} />
			<div className="px-4">
				<PendingFamily />
			</div>
		</>
	);
};

export default Pending;
