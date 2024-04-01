'use client';
import React, { useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import { getUserFromLocalStorage } from '@/utils/auth';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import { redirect, useRouter } from 'next/navigation';


const Dashboard = () => {
	const [isAdmin, setIsAdmin] = React.useState(false);
	const { url, dir, redirect } = useLocaleRouter();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (!user) {
			redirect(PATHS.LOGIN);
		} else {
			setIsAdmin(user.role === 'admin');
		}

	}, [url]);


	return (
		<div dir={dir} className="w-full bg-[#f4f4f4ea]">
			{isAdmin ? <AdminDashboard /> : <UserDashboard />}
		</div>
	);
};

export default Dashboard;
