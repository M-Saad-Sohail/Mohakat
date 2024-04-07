'use client';

import Footer from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';
import MobileNavbar from '@/components/ui/Navbar/MobileNavbar';
import StickeyBar from '@/components/ui/StickeyBar';
import { PATHS } from '@/contants';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import React from 'react';

type MainLayoutProps = {
	children: React.ReactNode;
	fromGazaMap?: boolean;
};

const MainLayout = ({ children, fromGazaMap }: MainLayoutProps) => {
	const { user, isLoading } = useLoggedInUser();
	const { redirectWithLocale } = useLocaleRouter();

	if (fromGazaMap) {
		return (
			<div>
				<Navbar />
				<MobileNavbar />
				{children}
				<Footer />
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
		<div className=" relative">
			<Navbar />
			<MobileNavbar />
			<StickeyBar />
			{children}
			<Footer />
		</div>
	);
};

export default MainLayout;
