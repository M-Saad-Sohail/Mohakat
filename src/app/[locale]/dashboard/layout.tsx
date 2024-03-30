'use client';
import LeftSideBar from '@/components/UI/Sidebar';
import { PATHS } from '@/contants';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { getUserFromLocalStorage } from '@/utils/auth';
import React, { useEffect, useState } from 'react';

const Layout = (props: {
	children: React.ReactNode;
	params: { locale: string };
}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { url, dir, redirect } = useLocaleRouter();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		setIsLoggedIn(!!user)
		if (!user) {
			redirect(PATHS.LOGIN)
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isLoggedIn) {
		return <></>
	}

	return (
		<div dir={dir}>
			<div className="flex bg-[#f4f4f4ea]">
				<LeftSideBar />
				<div className="w-full px-3 overflow-x-hidden">{props.children}</div>
			</div>
		</div>
	);
};

export default Layout;
