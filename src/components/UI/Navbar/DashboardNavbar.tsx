'use client';
import React, { useEffect, useState } from 'react';
import {
	language,
	profile,
} from '@/assests';
import Image from 'next/image';
import { getUserFromLocalStorage } from '@/utils/auth';
import useDirection from '@/hooks/useDirection';

type IProps = {
	setting?: boolean;
	title: String;
};

const DashboardNavbar = ({ title, setting }: IProps) => {
	let [user, setUser] = useState<{ name: string } | null>(null);
	useEffect(() => {
		const loggedInUser = getUserFromLocalStorage();
		setUser(loggedInUser);
	}, []);

	const dir = useDirection()

	return (
		<div dir={dir} className="flex w-full py-2">
			<h2 className="text-black text-[32px] ps-4 flex items-center w-full my-4 font-bold">
				{title}
			</h2>

			<div className={`items-center  flex float-right w-full justify-end`}>
				<Image
					src={language} // Replace with the path to the user profile image
					alt={''}
					className="w-8 h-8 mx-2 rounded-full"
					style={{ filter: 'invert(100%)' }}
				/>
				<div dir={dir} className="flex items-center mx-4">
					<Image
						src={profile} // Replace with the path to the user profile image
						alt={''}
						className="w-10 h-10 mx-2 rounded-full"
					/>
					<p className="text-black text-[16px]">{user ? user.name : ''}</p>
				</div>
			</div>
		</div>
	);
};

export default DashboardNavbar;
