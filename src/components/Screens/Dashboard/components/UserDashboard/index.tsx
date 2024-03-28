'use client'
import React, { useEffect, useState } from 'react';
import { UserType } from '@/state/user/types';
import { getUserFromLocalStorage } from '@/utils/auth';
import { redirect } from 'next/navigation';
import SocailSharing from './SocailSharing/SocailSharing'
import useLocaleRouter from '@/hooks/useLocaleRouter';


const UserDashboard = () => {
	const [user, setUser] = useState<UserType | null>(null);
	const router = useLocaleRouter()

	useEffect(() => {
		const loggedInUser = getUserFromLocalStorage();
		if (!loggedInUser) {
			router.redirect('/sign-in');
			return
		}
		setUser(loggedInUser)
	}, []);

	if (!user) return <></>;

	return (
		<>
			<div>
				<h1 className="text-4xl font-bold text-primary mt-10 leading-normal pt-2">
					Welcome {user.name}
				</h1>
			</div>
			<h6>Congratulation!! You've become a Sponser. You can share your sponsership to others on the social media</h6>
			<SocailSharing />
		</>
	);
};

export default UserDashboard;
