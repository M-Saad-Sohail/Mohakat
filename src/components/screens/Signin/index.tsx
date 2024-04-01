'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import Form from './Form';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const SignIn = () => {
	const { loginUser, isLoading } = useAuth();
	return (
		<AuthLayout>
			<Form submitHandler={loginUser} isLoading={isLoading} />
		</AuthLayout>
	);
};

export default SignIn;
