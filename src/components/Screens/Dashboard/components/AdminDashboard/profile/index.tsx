'use client';
import React from 'react';
import LeftSideBar from '@/components/UI/Sidebar';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import SettingForm from './components/Form';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/UI/MainLayout';
import { useTranslations } from 'next-intl';
import useDirection from '@/hooks/useDirection';

const Setting = () => {
	const { updatePassword,  isLoading } = useAuth();
	const t = useTranslations('AccountSettings');
	const dir = useDirection();
	return (
		<div dir={dir} className="flex overflow-hidden">
			<LeftSideBar />
			<div className="w-full px-4 bg-[#f4f4f4ea]">
				<DashboardNavbar title={t('title')} setting={true} />
				<div>
					<SettingForm updatePassword={updatePassword} isLoading={isLoading} />
				</div>
			</div>
		</div>
	);
};

export default Setting;
