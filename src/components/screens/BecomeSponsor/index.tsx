'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/common/MainLayout';

const BecomeSponsor = () => {
	const params = useSearchParams();
	const { registerUser, isLoading } = useAuth();

	const gazaMap = !!params && params.get('from') === 'gaza_map'

	return (
		<MainLayout fromGazaMap={gazaMap}>
			<AuthLayout>
				<Form
					fromGazaMap={gazaMap}
					submitHandler={registerUser}
					isLoading={isLoading}
				/>
			</AuthLayout>
		</MainLayout>
	);
};

export default BecomeSponsor;
