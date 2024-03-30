import React from 'react';
import LandingPage from '@/components/Screens/LandingPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Home',
};

const Page = () => <LandingPage />;

export default Page;
