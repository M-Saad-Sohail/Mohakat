'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { PATHS } from '@/contants';

const VerifyOtp = () => {
	const { verifyOtp, isLoading } = useAuth();
  const { redirect } = useLocaleRouter()
	const { user, isLoading: isUserLoading  } = useLoggedInUser()

	if (user) {
		redirect(PATHS.DASHBOARD)
		return <></>
	}

	if (user || isUserLoading) {
		return <></>
	}

  return (
		<AuthLayout>
			<Form submitHandler={verifyOtp} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default VerifyOtp;
