'use client';
import AuthLayout from '@/components/UI/AuthLayout';
import Form from './components/Form';
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { navigateToDashboardIfLoggedIn } from '@/utils/auth';
import { useRouter } from 'next/navigation';

const BecomeSponsor = () => {
	useEffect(() => {
		navigateToDashboardIfLoggedIn();
	}, []);
	const { registerUser, isLoading } = useAuth();
	return (
		<AuthLayout className="">
			<Form submitHandler={registerUser} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default BecomeSponsor;
