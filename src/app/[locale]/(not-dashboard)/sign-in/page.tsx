import React from 'react';
import SignIn from '@/components/screens/Signin';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign in',
};

const Page = () => {
	return (
			<SignIn />
	);
};

export default Page;
