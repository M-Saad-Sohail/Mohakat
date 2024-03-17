'use client';
import React, { useEffect } from 'react';
import MainLayout from '../../UI/MainLayout';
import LeftSideBar from '../../UI/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { getUserFromLocalStorage } from '@/utils/auth';
const Dashboard = () => {
	const user = getUserFromLocalStorage();
	const role = !!user && user.role === 'admin';
	console.log('role', role)
	return (
		<div className="flex">
			<LeftSideBar />
			{role ? <AdminDashboard /> : <UserDashboard />}
		</div>
	);
};

export default Dashboard;
