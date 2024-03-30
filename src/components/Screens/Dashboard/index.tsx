'use client';
import React, { useEffect } from 'react';
import MainLayout from '@/components/UI/MainLayout';
import LeftSideBar from '@/components/UI/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { getUserFromLocalStorage } from '@/utils/auth';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
const Dashboard = () => {
	const [isAdmin, setIsAdmin] = React.useState(false);
	const { url, dir } = useLocaleRouter();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (!user) {
			window.location.href = url(PATHS.LOGIN);
		} else {
			setIsAdmin(user.role === 'admin');
			console.log(isAdmin)
		}
	}, [url]);

	return (
		<div dir={dir} className="flex">
			<LeftSideBar />
			<div className="w-full bg-[#f4f4f4ea] px-3 overflow-x-hidden">
				{isAdmin ? <AdminDashboard /> : <UserDashboard />}
			</div>
		</div>
	);
};

export default Dashboard;
