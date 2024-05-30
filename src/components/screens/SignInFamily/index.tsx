'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const SignInFamily = () => {
	const { loginFamily, isLoading } = useAuth();
	return (
		<AuthLayout>
			<Form submitHandler={loginFamily} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default SignInFamily;