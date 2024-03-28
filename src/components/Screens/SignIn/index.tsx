'use client';
import AuthLayout from '@/components/UI/AuthLayout';
import Form from './components/Form';
import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { navigateIfLoggedIn } from '@/utils/auth';
import useLocaleRouter from '@/hooks/useLocaleRouter';

const SignIn = () => {
	const { url } = useLocaleRouter();

	useEffect(() => {
		navigateIfLoggedIn(url('/dashboard'));
	}, [url]);

	const { loginUser, isLoading } = useAuth();
	return (
		<AuthLayout>
			<Form submitHandler={loginUser} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default SignIn;
