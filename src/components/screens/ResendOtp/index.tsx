'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { PATHS } from '@/contants';
import { useSearchParams } from 'next/navigation';

const ResendOtp = () => {
	const { resendOtp, isLoading } = useAuth();
	const params = useSearchParams();

	const fromGazaMap = !!params && params.get('from') === 'gaza_map';

	return (
			<AuthLayout>
				<Form
					fromGazaMap={fromGazaMap}
					submitHandler={resendOtp}
					isLoading={isLoading}
				/>
			</AuthLayout>
	);
};

export default ResendOtp;
