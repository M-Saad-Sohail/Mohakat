'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import HeroSection from './HeroSection';
import SponserSection from './Sponsers/SponserSection';
import FamilySection from './FamilySection';
import PartnersSection from './PartnersSection';
import ImagesSection from './Intiation/ImagesSection';
import MainLayout from '@/components/common/MainLayout';
import AboutSection from './AboutSection';
import TestinomialSlider from './TestinomialSlider';
import AboutLandingPage from './AboutLandingPage';
import ThankYouModal from '@/components/ui/Modals/ThankYouModal';

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
		<MainLayout>
			<HeroSection isLoggedIn={!isLoading && !!user} />
			<AboutLandingPage />
			<SponserSection isLoggedIn={!isLoading && !!user} />
			<FamilySection isLoggedIn={!isLoading && !!user} />
			<MapSection isLoggedIn={!isLoading && !!user} />
			<TestinomialSlider />
			<PartnersSection />
		</MainLayout>
	);
};

export default LandingPage;
