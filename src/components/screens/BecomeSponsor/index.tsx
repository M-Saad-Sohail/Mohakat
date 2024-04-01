'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { navigateIfLoggedIn } from '@/utils/auth';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useSearchParams } from 'next/navigation';
import NotDashboardLayout from '@/components/common/NotDashboardLayout';

const BecomeSponsor = () => {
	const params = useSearchParams();
	const { registerUser, isLoading } = useAuth();

	const gazaMap = !!params && params.get('from') === 'gaza_map'

	return (
		<NotDashboardLayout fromGazaMap={gazaMap}>
			<AuthLayout>
				<Form
					fromGazaMap={gazaMap}
					submitHandler={registerUser}
					isLoading={isLoading}
				/>
			</AuthLayout>
		</NotDashboardLayout>
	);
};

export default BecomeSponsor;
