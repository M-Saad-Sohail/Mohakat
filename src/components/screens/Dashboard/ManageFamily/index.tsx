'use client';
import { getUserFromLocalStorage } from '@/utils/auth';
import React, { useEffect, useState } from 'react';
import ManageFamily from './ManageFamily';

const ManageFamilyPage = () => {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (user && user.role === 'admin') {
			setIsAdmin(true);
		}
	}, []);
	return <div className="px-4">{isAdmin ? <ManageFamily /> : ''}</div>;
};

export default ManageFamilyPage;
