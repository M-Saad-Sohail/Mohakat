import React from 'react';
import MainLayout from '@/components/common/MainLayout';
import { Metadata } from 'next';
import ForgotPasswordFamily from '@/components/screens/ForgotPasswordFamily';
import AuthLayout from '@/components/ui/AuthLayout';

export const metadata: Metadata = {
	title: 'Forgot Password',
};

const Page = () => {
	return (
		<MainLayout>
			<AuthLayout>
				<ForgotPasswordFamily />
			</AuthLayout>
		</MainLayout>
	);
};

export default Page;
