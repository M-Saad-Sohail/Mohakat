'use client';
import React, { useEffect, useState } from 'react';
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
	sidebar_icon,
} from '@/assests';
import Link from 'next/link';
import Image from 'next/image';
import { getUserFromLocalStorage } from '@/utils/auth';
import { useAuth } from '@/hooks/useAuth';
import ham_icon from '@/assests/icons/hamburger_icon.png';
import { useWindowSize } from '@/hooks/useWindowSize';
import useLocaleRouter from '@/hooks/useLocaleRouter';

const LeftSideBar = () => {
	const [active, setActive] = useState('/');
	const size = useWindowSize();
	const [open, setOpen] = useState(size.width > 768);
	const [user, setUser] = useState<{ name: string; email: string } | null>(
		null,
	);
	const [clickedMenu, setClickedMenu] = useState<number | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const { logoutUser } = useAuth();

	const { url, locale } = useLocaleRouter();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (user && user.role === 'admin') {
			setIsAdmin(true);
			setUser(user);
		}
	}, []);
	const AdminMenus = [
		{ title: 'Dashboard', src: dashboard, link: '/dashboard', gap: true },
		{ title: 'Families', src: families, link: '/families' },
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
		{ title: 'Form Response', src: form_icon, link: '/dashboard', gap: true },
		{ title: 'Setting ', src: setting_icon, link: '/dashboard/setting' },
		{ title: 'Logout', src: logout, link: '/sign-in' },
	];
	const UserMenus = [
		{ title: 'Dashboard', src: dashboard, link: '/dashboard', gap: true },
		{ title: 'Families', src: families, link: '/families' },
		{ title: 'Sponsoring', src: sponsor, link: '/sponsoring' },
		{
			title: 'Credit Cards',
			src: credit_card,
			link: '/credit-cards',
			gap: true,
		},
		{ title: 'Form Response', src: form_icon, link: '/dashboard', gap: true },
		{ title: 'Setting ', src: setting_icon, link: '/dashboard/setting' },
		{ title: 'Logout', src: logout, link: '/sign-in' },
	];

	const handleMenuClick = (index: number) => {
		setClickedMenu(index); // Update the clicked menu index
	};
	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (user && user.role === 'admin') {
			setIsAdmin(true);
			setUser(user);
		}
		const pathname = window.location.pathname;
		setActive(pathname);
	}, []);
	const Menus = isAdmin ? AdminMenus : UserMenus;
	return (
		<div className="flex h-full">
			<div
				className={`fixed ${open ? 'w-[270px] max-h-fit' : 'w-20 '} bg-white h-screen p-5 pt-8 relative duration-300 shadow-lg`}
			>
				<Image
					src={ham_icon}
					alt=""
					className={`absolute cursor-pointer right-4 top-[0.8rem] w-5  ${!open && 'rotate-180 right-8 '}`}
					onClick={() => setOpen((prev) => !prev)}
				/>
				<div className="flex gap-x-2 items-center">
					<Link href={url('/')}>
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
					{/* <Image
						alt=""
						src={sidebar_icon}
						className={`${open && 'hidden'}`}
						width={150}
						height={150}
					/> */}
					<Image
						src={profile}
						alt={''}
						className="h-[50px] w-[50px] rounded-full mt-2"
					/>
					<p className={`${!open && 'hidden'} font-bold text-[20px]`}>
						{user ? user.name : ''}
					</p>
					<p
						className={`${!open && 'hidden'} ${isAdmin && 'hidden'} rounded-lg bg-[#95dca9] px-4 text-bg mt-1`}
					>
						Verified
					</p>
				</div>
				<ul className={` pt-10`}>
					{Menus.map((Menu, index) => (
						<Link key={index} locale={locale} href={url(Menu.link)}>
							<li
								className={`flex-col mt-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 ${index === 0 && 'bg-light-white'}  ${active !== Menu.link && 'text-primary'}`}
								onClick={() => {
									handleMenuClick(index);
									if (Menu.title === 'Logout') {
										logoutUser();
									}
								}}
							>
								<div className="flex gap-x-4">
									<Image
										src={Menu.src}
										className="w-7 h-7 object-contain"
										alt=""
										style={
											clickedMenu === index || active === Menu.link
												? {
														filter:
															'invert(26%) sepia(96%) saturate(581%) hue-rotate(317deg) brightness(91%) contrast(83%)',
													}
												: {}
										}
									/>
									<div
										className={`${!open && 'hidden'} text-black origin-left duration-200 font-bold text-[17px] ${clickedMenu === index ? 'text-primary' : ''}  ${active === Menu.link && 'text-primary'} `}
									>
										{Menu.title}
									</div>
								</div>
								{Menu.gap && (
									<div
										className={`${!open && 'w-[20px] mt-5'} w-[200px] h-[1.3px] mt-5 border-t-1 border-black bg-black `}
									></div>
								)}
							</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	);
};

export default LeftSideBar;
