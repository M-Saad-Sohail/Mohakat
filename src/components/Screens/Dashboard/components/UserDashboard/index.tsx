import React, { useEffect, useState } from 'react';
import { UserType } from '../../../../../state/user/types';
import { getUserFromLocalStorage } from '../../../../../utils/auth';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

const UserDashboard = () => {
	const [user, setUser] = useState<UserType | null>(null);
	// const router = useRouter();
	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (!user) {
			redirect('/sign-in');
		}
	}, [user]);

	if (!user) return <></>;

	return (
		<h1 className="text-4xl font-bold text-primary mt-10 leading-normal pt-2">
			Welcome {user.name}
		</h1>
	);
};

export default UserDashboard;
