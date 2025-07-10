'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/common/MainLayout';

const FamilyVerifyOtp = () => {
	const { familyverifyOtp, isLoading } = useAuth();
	const params = useSearchParams();
	const fromGazaMap = !!params && params.get('from') === 'gaza_map';

	return (
		<MainLayout fromGazaMap={fromGazaMap}>
			<AuthLayout>
				<Form
					fromGazaMap={fromGazaMap}
					submitHandler={familyverifyOtp}
					isLoading={isLoading}
				/>
			</AuthLayout>
		</MainLayout>
	);
};

export default FamilyVerifyOtp;
