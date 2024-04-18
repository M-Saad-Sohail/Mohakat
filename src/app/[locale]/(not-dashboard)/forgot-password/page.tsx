import React from 'react';
import MainLayout from '@/components/common/MainLayout';
import { Metadata } from 'next';
import ForgotPassword from '@/components/screens/ForgotPassword';
import AuthLayout from '@/components/ui/AuthLayout';

export const metadata: Metadata = {
	title: 'Forgot Password',
};

const Page = () => {
	return (
		<MainLayout>
			<AuthLayout>
				<ForgotPassword />
			</AuthLayout>
		</MainLayout>
	);
};

export default Page;
