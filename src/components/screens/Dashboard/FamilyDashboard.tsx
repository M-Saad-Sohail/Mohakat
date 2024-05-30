'use client';
import React, { useEffect, useState } from 'react';
import { UserType } from '@/state/user/types';
import { getUserFromLocalStorage } from '@/utils/auth';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
const FamilyDashboard = () => {
	const [user, setUser] = useState<UserType | null>(null);
	const router = useLocaleRouter();
    const t = useTranslations('Socail');

	function redirectToHomePage() {
		router.replace('/'); // Change the URL to your landing page URL
	}

	useEffect(() => {
		const loggedInUser = getUserFromLocalStorage();
		if (!loggedInUser) {
			router.redirect(PATHS.LOGIN);
			return;
		}
		setUser(loggedInUser);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user) return <></>;
	
	return (
		<div className="relative">
			<div className = "mb-6">
				<DashboardNavbar  title={t('dashboard')} />
			</div>	
		</div>
	);
};

export default FamilyDashboard;
