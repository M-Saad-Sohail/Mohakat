
'use client';
import { useEffect, useState } from 'react';

import {
	dashboard,
	sponsor,
	families,
	credit_card,
	logo,
	approved__icon,
	pending_icon,
	deny_icon,
	profile,
	dashboard_logo,
	setting_icon,
	form_icon,
	logout,
} from './../../../assests';
import Link from 'next/link';
import Image from 'next/image';
import { getUserFromLocalStorage } from '@/utils/auth';
import { useAuth } from '@/hooks/useAuth';
// import { isAdminUserLoggedIn } from "./../../../utils/auth";
import ham_icon from '@/assests/icons/hamburger_icon.png';
import { useWindowSize } from 'hooks/useWindowSize';
import { toast } from 'react-toastify';

const LeftSideBar = () => {
	const size = useWindowSize();
	const [open, setOpen] = useState(size.width > 768);
	let [user, setUser] = useState<{ name: string; email: string } | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const { logoutUser } = useAuth();
	const [clickedMenu, setClickedMenu] = useState(0);
	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (user && user.role === 'admin') {
			setIsAdmin(true);
			setUser(user);
		}
	}, []);
	const Menus = [
		{ title: 'Dashboard', src: dashboard, link: '/dashboard', gap: true },
		{ title: 'Families', src: families, link: '#' },
		{
			title: 'Pending Sponsor',
			src: pending_icon,
			link: '/dashboard/sponsor/pending',
		},
		{
			title: 'Approved Sponsor',
			src: approved__icon,
			link: '/dashboard/sponsor/approved',
		},
		{
			title: 'Rejected Sponsor',
			src: deny_icon,
			link: '/dashboard/sponsor/rejected',
			
			
		},
		{ title: 'Form Response', src: form_icon, link: '/dashboard',gap: true, },
		{ title: 'Setting ', src: setting_icon, link: '/dashboard/setting' },
		{ title: 'Logout', src: logout, link: '/sign-in' },
	];

	return (
		<div className="flex h-full">
			<div
				className={`fixed ${open ? 'w-[270px] max-h-fit' : 'w-20 '}
          bg-white h-screen p-5 pt-8 relative duration-300 shadow-lg`}
			>
				<Image
					src={ham_icon}
					alt=""
					className={`absolute cursor-pointer right-4 top-[2.3rem] w-5  ${
						!open && 'rotate-180 right-8 '
					}`}
					onClick={() => setOpen(!open)}
				/>

				<div className="flex gap-x-2 items-center">
					<Link href="/">
						<Image
							alt=""
							src={dashboard_logo}
							className={`${!open && 'hidden'}`}
							width={150}
							height={150}
						/>
					</Link>
				</div>
				<div className="flex-col flex mx-auto items-center justify-center mt-[40px]">
					<Image
						src={profile} // Replace with the path to the user profile image
						alt={''}
						className="h-[150px] w-[150px] rounded-full mr-2"
					/>
					<p className={`${!open && 'hidden'} font-bold text-[20px]`}>
						{user ? user.name : ''}
					</p>
					<p className={`${!open && 'hidden'}`}>{user ? user.email : ''}</p>
				</div>
				<ul className={`${!open && "-mt-14"} pt-6`}>
					{Menus.map((Menu, index) => (
						<Link
							href={Menu.link}
							key={index}
							{...(Menu.title === 'Logout' && {
								onClick: () => {
									logoutUser();
								},
							})}
						>
							<li
								className={`flex-col mt-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 
                   ${index === 0 && 'bg-light-white'}`}
							>   <div className='flex gap-x-4'>
								<Image
									src={Menu.src}
									className="w-5 h-5 object-contain"
									alt=""
									style={
										clickedMenu === index
											? {
													filter:
														'invert(26%) sepia(96%) saturate(581%) hue-rotate(317deg) brightness(91%) contrast(83%)',
												}
											: {}
									}
								/>
								<div
									className={`${
										!open && 'hidden'
									} text-black origin-left duration-200 font-bold text-[17px]`}
								>
									{Menu.title}
								</div>
							</div>
								
								{Menu.gap && (
									<div
										className={`${!open && 'w-[20px] mt-5'} w-[200px] h-[2px] mt-5 border-t-2 border-black bg-black `}
									></div>
								)}{' '}
							</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	);
};

export default LeftSideBar;
