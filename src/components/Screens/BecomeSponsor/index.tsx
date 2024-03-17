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
			<div className="w-full px-3 overflow-x-hidden">
				<Form submitHandler={registerUser} isLoading={isLoading} />
			</div>
		</AuthLayout>
	);
};

export default BecomeSponsor;
