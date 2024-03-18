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
import '@/styles/scroll.css';

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
		<div className="flex">
			<div
				className={`fixed ${open ? 'w-[270px]' : 'w-20 '} bg-white max-h-fit overflow-y-hidden p-5 pt-8 relative duration-300 shadow-lg`}
			>
				<div className="flex gap-x-2 justify-between items-center">
					{open && (
						<Link href={url('/')}>
							<Image alt="" src={dashboard_logo} width={100} height={100} />
						</Link>
					)}
					{open ? (
						<Image
							alt=""
							src={sidebar_icon}
							className={`w-5 cursor-pointer `}
							width={50}
							height={50}
							onClick={() => setOpen(false)}
						/>
					) : (
						<Image
							src={ham_icon}
							alt=""
							className={`w-5 cursor-pointer ml-2`}
							width={50}
							height={50}
							onClick={() => setOpen(true)}
						/>
					)}
				</div>
				<div className="flex-col flex mx-auto items-center justify-center mt-[40px]">
					<Image
						src={profile}
						alt={''}
						className="h-[50px] w-[50px] rounded-full mt-2"
					/>
					<p className={`${!open && 'hidden'} font-bold text-[14px] mt-2`}>
						{user ? user.name : ''}
					</p>
					<p
						className={`${!open || isAdmin ? 'hidden' : ''} rounded-lg bg-[#95dca9] px-4 text-[10px] mt-1`}
					>
						Verified
					</p>
				</div>
				<ul className={`pt-10`}>
					{Menus.map((Menu, index) => (
						<Link key={index} locale={locale} href={url(Menu.link)}>
							<li
								className={`flex-col mt-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-[16px] items-center gap-x-4 ${index === 0 && 'bg-light-white'}  ${active !== Menu.link && 'text-primary'}`}
								onClick={() => {
									handleMenuClick(index);
									if (Menu.title === 'Logout') {
										logoutUser();
									}
								}}
							>
								<div className="flex gap-x-4 items-center">
									<Image
										src={Menu.src}
										className="w-5 h-5 object-contain"
										alt=""
										style={
											clickedMenu === index || active === Menu.link ? {} : {}
										}
									/>
									<div
										className={`${!open && 'hidden'} text-black origin-left duration-200 text-[16px] font-[400] ${clickedMenu === index ? 'text-primary font-semibold' : ''}  ${active === Menu.link && 'text-primary font-semibold'} `}
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
