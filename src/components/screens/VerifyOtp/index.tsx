'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';

const VerifyOtp = () => {
	const { verifyOtp, isLoading } = useAuth();
	const params = useSearchParams();
	const fromGazaMap = !!params && params.get('from') === 'gaza_map';

	return (
			<AuthLayout>
				<Form
					fromGazaMap={fromGazaMap}
					submitHandler={verifyOtp}
					isLoading={isLoading}
				/>
			</AuthLayout>
	);
};

export default VerifyOtp;
