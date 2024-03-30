import React from 'react';
import Dashboard from '@/components/Screens/Dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Dashboard`
}

const index = () => <Dashboard />;

export default index;
