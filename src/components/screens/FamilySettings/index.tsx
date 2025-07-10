'use client';
import React from 'react';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import SettingForm from './Form';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';

const FamilySettings = () => {
	const { updatePasswordFamily, isLoading } = useAuth();
	const t = useTranslations('AccountSettings');
	return (
		<div className="w-full bg-[#f4f4f4ea]">
			<DashboardNavbar title={t('title')} setting={true} />
			<div>
				<SettingForm updatePassword={updatePasswordFamily} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default FamilySettings;
