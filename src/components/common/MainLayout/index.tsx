'use client';

import { Navbar } from '@/components/ui/Navbar';
import { PATHS } from '@/contants';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import React from 'react';

type MainLayoutProps = {
	children: React.ReactNode;
	fromGazaMap?: boolean;
};

const MainLayout = ({
	children,
	fromGazaMap,
}: MainLayoutProps) => {
	const { user, isLoading } = useLoggedInUser();
	const { redirectWithLocale } = useLocaleRouter();

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

export default MainLayout;
