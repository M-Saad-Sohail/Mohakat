'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { PATHS } from '@/contants';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/common/MainLayout';

const FamilyResendOtp = () => {
	const { familyresendOtp, isLoading } = useAuth();
	const params = useSearchParams();

	const fromGazaMap = !!params && params.get('from') === 'gaza_map';

	return (
		<MainLayout fromGazaMap={fromGazaMap}>
			<AuthLayout>
				<Form
					fromGazaMap={fromGazaMap}
					submitHandler={familyresendOtp}
					isLoading={isLoading}
				/>
			</AuthLayout>
		</MainLayout>
	);
};

export default FamilyResendOtp;
