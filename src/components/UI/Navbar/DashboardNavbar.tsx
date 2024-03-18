'use client';
import React, { useEffect, useState } from 'react';
import {
	language,
	profile,
} from '@/assests';
import Image from 'next/image';
import { getUserFromLocalStorage } from '@/utils/auth';
import SearchBar from '../SearchBar';

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
		<div className="flex py-4 mobile:pt-4 w-full ">
			<h2 className="text-black text-[56px] flex items-center w-full  my-4 font-bold">
				{title}
			</h2>

			<div className={`items-center  flex float-right w-full justify-end`}>
				<Image
					src={language} // Replace with the path to the user profile image
					alt={''}
					className="h-10 w-10 rounded-full mx-2"
					style={{ filter: 'invert(100%)' }}
				/>
				<div className="flex items-center mx-4">
					<Image
						src={profile} // Replace with the path to the user profile image
						alt={''}
						className="h-12 w-12 rounded-full mx-2"
					/>
					<p className="text-black">{user ? user.name : ''}</p>
				</div>
			</div>
		</div>
	);
};

export default DashboardNavbar;
