import React from 'react';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import FamilyForm from '@/components/screens/Dashboard/Families/Form';

export const metadata: Metadata = {
	title: `Families`
}

const AddFamilies = () => {
	const t = useTranslations('AddFamilies');

	return (
		<>
			<DashboardNavbar title={t('title')} />
			<div className="px-4">
				<FamilyForm />
			</div>
		</>
	);
};

export default AddFamilies;