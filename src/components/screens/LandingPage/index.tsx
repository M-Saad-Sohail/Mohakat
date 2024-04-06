'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/ui/Navbar';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import HeroSection from './HeroSection';
import SponserSection from './SponserSection';
import FamiliesSection from './FamiliesSection';
import Footer from '@/components/ui/Footer';
import PartnersSection from './PartnersSection';
import ImagesSection from './ImagesSection';
import MobileNavbar from '@/components/ui/Navbar/MobileNavbar';

const MapSection = dynamic(() => import('./MapSection'), {
	ssr: false,
});

const LandingPage = () => {
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
		<div>
			<Navbar />
			<MobileNavbar/>
			<HeroSection />
			<SponserSection />
			<FamiliesSection />
			{/* <MapSection isLoggedIn={!isLoading && !!user} /> */}
			<ImagesSection />
			<PartnersSection />
			<Footer />
		</div>
	);
};

export default LandingPage;
