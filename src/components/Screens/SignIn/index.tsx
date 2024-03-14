'use client';
import AuthLayout from '../../UI/AuthLayout';
import Form from './components/Form';
import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { navigateToDashboardIfLoggedIn } from './../../../utils/auth';
import { useRouter } from 'next/navigation';

const SignIn = () => {
	const router = useRouter();

	useEffect(() => {
		navigateToDashboardIfLoggedIn(router);
	}, [router]);

	const { loginUser, isLoading } = useAuth();
	return (
		<AuthLayout>
			<Form submitHandler={loginUser} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default SignIn;
