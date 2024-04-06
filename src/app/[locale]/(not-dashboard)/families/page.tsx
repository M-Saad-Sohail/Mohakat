import LandingFamilyPage from '@/components/screens/Families';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Family',
};

const page = () => {
	return <LandingFamilyPage />;
};

export default page;
