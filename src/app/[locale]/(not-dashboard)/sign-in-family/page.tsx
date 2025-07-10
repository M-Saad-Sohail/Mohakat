import React from 'react';
import SignInFamily from '@/components/screens/SignInFamily';
import MainLayout from '@/components/common/MainLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign in family',
};

const Page = () => {
	return (
		<MainLayout>
			<SignInFamily />
		</MainLayout>
	);
};

export default Page;
