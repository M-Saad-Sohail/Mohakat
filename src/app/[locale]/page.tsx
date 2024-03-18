import React from 'react';
import BecomeSponsor from '@/components/Screens/BecomeSponsor';
import LandingPage from '@/components/Screens/LandingPage';
import { Metadata } from 'next';
import { useTranslation } from 'next-i18next';

export const metadata: Metadata = {
	title: 'Home',
}

const index = () => {
	return (
		<div>
			<LandingPage />
		</div>
	);
};

export default index;
