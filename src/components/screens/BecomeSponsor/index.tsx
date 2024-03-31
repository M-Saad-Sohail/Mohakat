'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { navigateIfLoggedIn } from '@/utils/auth';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useParams, useSearchParams } from 'next/navigation';

const BecomeSponsor = () => {
	const { url } = useLocaleRouter();
	const params = useSearchParams()

	useEffect(() => {
		if (params && params.get('from') === 'gaza_map') {
			return;
		}
		navigateIfLoggedIn(url('/dashboard'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const { registerUser, isLoading } = useAuth();

	return (
		<AuthLayout className="">
			<Form submitHandler={registerUser} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default BecomeSponsor;
