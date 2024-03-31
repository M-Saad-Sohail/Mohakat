'use client';
import React, { useEffect, useState } from 'react';
import { UserType } from '@/state/user/types';
import { getUserFromLocalStorage } from '@/utils/auth';
import SocailSharing from './SocailSharing/SocailSharing';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';

const UserDashboard = () => {
	const [user, setUser] = useState<UserType | null>(null);
	const router = useLocaleRouter();
	
	useEffect(() => {
		const loggedInUser = getUserFromLocalStorage();
		if (!loggedInUser) {
			router.redirect(PATHS.LOGIN);
			return;
		}
		setUser(loggedInUser);
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user) return <></>;

	return (
		<>
			<div className="text-center">
				<h1 className="pt-2 mt-10 text-4xl font-bold leading-normal text-primary">
					Welcome {user.name}
				</h1>
			</div>
			<div className="text-center">
				<h6>
					Congratulation!! You've become a Sponser. You can share your
					sponsership to others on the social media
				</h6>
				<SocailSharing />
			</div>
		</>
	);
};

export default UserDashboard;
