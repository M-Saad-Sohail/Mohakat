'use client';
import AuthLayout from '@/components/UI/AuthLayout';
import Form from './components/Form';
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { navigateIfLoggedIn } from '@/utils/auth';
import useLocaleRouter from '@/hooks/useLocaleRouter';

const BecomeSponsor = () => {
	const { url } = useLocaleRouter();

	useEffect(() => {
		navigateIfLoggedIn(url('/dashboard'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { registerUser, isLoading } = useAuth();

	return (
		<AuthLayout className="">
			<Form submitHandler={registerUser} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default BecomeSponsor;
