import React from 'react';
import SignIn from '@/components/screens/Signin';
import MainLayout from '@/components/common/MainLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign in',
};

const Page = () => {
	return (
		<MainLayout>
			<SignIn />
		</MainLayout>
	);
};

export default Page;
