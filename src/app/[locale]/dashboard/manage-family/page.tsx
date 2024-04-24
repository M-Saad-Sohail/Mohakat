import React from 'react';
import ManageFamilyPage from '@/components/screens/Dashboard/ManageFamily';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Manage Families`,
};

const ManageFamily = () => {
	const t = useTranslations('ManageFamilies');

	return (
		<>
			<DashboardNavbar title={t('title')} />
			<div className="px-4">
				<ManageFamilyPage />
			</div>
		</>
	);
};

export default ManageFamily;
