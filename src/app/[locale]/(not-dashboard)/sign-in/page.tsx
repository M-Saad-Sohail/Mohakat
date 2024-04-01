import React from 'react';
import SignIn from '@/components/screens/Signin';
import NotDashboardLayout from '@/components/common/NotDashboardLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign in',
};

const Page = () => {
	return (
		<NotDashboardLayout>
			<SignIn />
		</NotDashboardLayout>
	);
};

export default Page;
