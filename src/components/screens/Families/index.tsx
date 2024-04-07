'use client';
import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import Footer from '@/components/ui/Footer';
import MobileNavbar from '@/components/ui/Navbar/MobileNavbar';
import FamiliesSection from './FamiliesSection';
import MainLayout from '@/components/common/MainLayout';

const LandingFamilyPage = () => {
	const { user, isLoading } = useLoggedInUser();
	const { locale, redirectWithLocale } = useLocaleRouter();

	if (isLoading) {
		return null;
	}

	// This will allow only user to show landing page in his language
	// if (user && user.language !== locale) {
	// 	redirectWithLocale(user.language, '/')
	// 	return <></>
	// }

	return (
		<MainLayout>
			<FamiliesSection />
		</MainLayout>
	);
};

export default LandingFamilyPage;
