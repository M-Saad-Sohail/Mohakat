'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { PATHS } from '@/contants';

const ResendOtp = () => {
	const { resendOtp, isLoading } = useAuth();
	const { redirect } = useLocaleRouter();
	const { user, isLoading: isUserLoading } = useLoggedInUser();
	if (user) {
		redirect(PATHS.DASHBOARD);
		return <></>;
	}
	if (user || isUserLoading) {
		return <></>;
	}
	return (
		<AuthLayout>
			<Form submitHandler={resendOtp} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default ResendOtp;
