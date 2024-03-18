'use client';
import React, { useEffect, useState } from 'react';
import {
	language,
	profile,
} from '@/assests';
import Image from 'next/image';
import { getUserFromLocalStorage } from '@/utils/auth';

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

	return (
		<div className="flex py-2 w-full">
			<h2 className="text-black text-[32px] ps-4 flex items-center w-full my-4 font-bold">
				{title}
			</h2>

			<div className={`items-center  flex float-right w-full justify-end`}>
				<Image
					src={language} // Replace with the path to the user profile image
					alt={''}
					className="h-8 w-8 rounded-full mx-2"
					style={{ filter: 'invert(100%)' }}
				/>
				<div className="flex items-center mx-4">
					<Image
						src={profile} // Replace with the path to the user profile image
						alt={''}
						className="h-10 w-10 rounded-full mx-2"
					/>
					<p className="text-black text-[16px]">{user ? user.name : ''}</p>
				</div>
			</div>
		</div>
	);
};

export default DashboardNavbar;
