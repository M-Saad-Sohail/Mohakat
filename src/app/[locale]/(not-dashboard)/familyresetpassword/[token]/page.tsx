import React from 'react';
import MainLayout from '@/components/common/MainLayout';
import { Metadata } from 'next';
import AuthLayout from '@/components/ui/AuthLayout';
import FamilyResetPassword from '@/components/screens/FamilyResetPassword';

export const metadata: Metadata = {
	title: 'Family Reset Password',
};

const Page = () => {
	return (
		<MainLayout>
			<AuthLayout>
				<FamilyResetPassword />
			</AuthLayout>
		</MainLayout>
	);
};

export default Page;
