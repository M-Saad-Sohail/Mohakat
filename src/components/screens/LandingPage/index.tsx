'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/ui/Navbar';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';

const Hero = dynamic(() => import('./Hero'), {
	ssr: false,
});

const LandingPage = () => {
	const { user, isLoading } = useLoggedInUser()
	const { locale, redirectWithLocale } = useLocaleRouter()

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
			<Hero isLoggedIn={!isLoading && !!user} />
		</div>
	);
};

export default LandingPage;
