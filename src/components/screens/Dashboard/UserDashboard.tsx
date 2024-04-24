'use client';
import React, { useEffect, useState } from 'react';
import { UserType } from '@/state/user/types';
import { getUserFromLocalStorage } from '@/utils/auth';
import SocailSharing from './SocailSharing/SocailSharing';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import { FaHome } from 'react-icons/fa';

const UserDashboard = () => {
	const [user, setUser] = useState<UserType | null>(null);
	const router = useLocaleRouter();

	function redirectToHomePage() {
		router.replace('/'); // Change the URL to your landing page URL
	}

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
		<div className="relative">
			<div
				className=" absolute right-4 -top-4 text-[40px] cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded-full"
				onClick={() => redirectToHomePage()}
			>
				<FaHome />
			</div>
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
		</div>
	);
};

export default UserDashboard;
