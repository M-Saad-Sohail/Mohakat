'use client';
import { getUserFromLocalStorage } from '@/utils/auth';
import React, { useEffect, useState } from 'react';
import FamilyForm from './Form';
import FamiliesSection from '../../Families/FamiliesSection';

const DashBoardFamilyPage = () => {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (user && user.role === 'admin') {
			setIsAdmin(true);
		}
	}, []);
	return (
		<div className="md:px-4 px-0">{isAdmin ? <FamilyForm /> : <FamiliesSection/>}</div>
	);
};

export default DashBoardFamilyPage;
