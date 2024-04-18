import React from 'react';
import MainLayout from '@/components/common/MainLayout';
import { Metadata } from 'next';
import AuthLayout from '@/components/ui/AuthLayout';
import ResetPassword from '@/components/screens/ResetPassword';

export const metadata: Metadata = {
	title: 'Reset Password',
};

const Page = () => {
	return (
		<MainLayout>
			<AuthLayout>
				<ResetPassword />
			</AuthLayout>
		</MainLayout>
	);
};

export default Page;
