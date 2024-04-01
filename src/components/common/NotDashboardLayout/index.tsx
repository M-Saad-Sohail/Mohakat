'use client';

import { Navbar } from '@/components/ui/Navbar';
import { PATHS } from '@/contants';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import React from 'react';

type NotDashboardLayoutProps = {
	children: React.ReactNode;
	fromGazaMap?: boolean;
};

const NotDashboardLayout = ({
	children,
	fromGazaMap,
}: NotDashboardLayoutProps) => {
	const { user, isLoading } = useLoggedInUser();
	const { redirect, redirectWithLocale } = useLocaleRouter();

	if (fromGazaMap) {
		return (
			<div>
				<Navbar />
				{children}
			</div>
		);
	}

	if (!!user) {
    let locale = 'en';
    if (['en', 'ar', 'tr'].includes(user.language)) {
      locale = user.language;
    }
		redirectWithLocale(locale, PATHS.DASHBOARD);
	}

	if (isLoading || !!user) {
		return null;
	}

	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default NotDashboardLayout;
