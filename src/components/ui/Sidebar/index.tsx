'use client';
import React, { useEffect, useState } from 'react';
import {
	dashboard,
	sponsor,
	families,
	credit_card,
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
import useDirection from '@/hooks/useDirection';
import { useTranslations } from 'next-intl';
import { PATHS } from '@/contants';

const AdminMenus = [
	{ title: 'dashboard', src: dashboard, link: PATHS.DASHBOARD , gap: true },
	{ title: 'families', src: families, link: PATHS.FAMILIES },
	{
		title: 'sponsor.pending',
		src: pending_icon,
		link: PATHS.PENDING_SPONSOR,
	},
	{
		title: 'sponsor.approved',
		src: approved__icon,
		link: PATHS.APPROVED_SPONSOR,
	},
	{
		title: 'sponsor.rejected',
		src: deny_icon,
		link: PATHS.REJECTED_SPONSOR,
	},
	{
		title: 'form_response',
		src: form_icon,
		link: PATHS.FORM_RESPONSES,
		gap: true,
	},
	{ title: 'settings', src: setting_icon, link: PATHS.SETTING },
	{ title: 'logout', src: logout, link: PATHS.LOGIN },
];

const UserMenus = [
	{ title: 'dashboard', src: dashboard, link: PATHS.DASHBOARD, gap: true },
	{ title: 'families', src: families, link: PATHS.FAMILIES },
	{ title: 'sponsoring', src: sponsor, link: PATHS.SPONSORING },
	{
		title: 'credit_cards',
		src: credit_card,
		link: PATHS.CREDIT_CARDS,
		gap: true,
	},
	{ title: 'settings', src: setting_icon, link: PATHS.SETTING },
	{ title: 'logout', src: logout, link: PATHS.LOGIN },
];

type SideBarHeaderProps = {
	handleOpen: () => void;
	handleClose: () => void;
	open: boolean;
};

const SideBarHeader = (props: SideBarHeaderProps) => {
	const { url, dir } = useLocaleRouter();

	if (!props.open) {
		return (
			<div
				key={'sidebar-header-close'}
				className="flex items-center justify-between gap-x-2"
			>
				<Image
					src={ham_icon}
					alt=""
					className={`w-5 cursor-pointer ${dir === 'ltr' ? 'ml-2' : 'mr-2'}`}
					width={50}
					height={50}
					onClick={props.handleOpen}
				/>
			</div>
		);
	}

	return (
		<div
			key={'sidebar-header-open'}
			className="flex items-center justify-between gap-x-2"
		>
			<Link href={url('/')}>
				<Image alt="" src={dashboard_logo} width={100} height={100} />
			</Link>
			<Image
				alt=""
				src={sidebar_icon}
				className={`w-5 cursor-pointer ${
					dir === 'rtl' ? 'rotate-180' : 'rotate-0'
				}`}
				width={50}
				height={50}
				onClick={props.handleClose}
			/>
		</div>
	);
};

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

	const { url, locale, dir } = useLocaleRouter();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (user && user.role === 'admin') {
			setIsAdmin(true);
			setUser(user);
		}
		const pathname = window.location.pathname;
		setActive(pathname);
	}, []);

	const t = useTranslations('Sidebar');

	const handleMenuClick = (index: number) => {
		setClickedMenu(index); // Update the clicked menu index
	};

	const menus = isAdmin ? AdminMenus : UserMenus;

	return (
		<div className="flex min-h-[100vh]" dir={dir}>
			<div
				className={`fixed bg-white max-h-fit overflow-y-hidden p-5 pt-8 relative duration-300 shadow-lg ${
					open ? 'w-[270px]' : 'w-20 '
				}`}
			>
				<SideBarHeader
					open={open}
					handleOpen={() => setOpen(true)}
					handleClose={() => setOpen(false)}
				/>
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
						className={`${
							!open || isAdmin ? 'hidden' : ''
						} rounded-lg bg-[#95dca9] px-4 py-1 text-[10px] mt-1`}
					>
						{t('verified')}
					</p>
				</div>
				<ul className={`pt-10`}>
					{menus.map((menu, index) => (
						<Link key={index} locale={locale} href={url(menu.link)}>
							<li
								className={`flex-col mt-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-[16px] items-center gap-x-4 ${
									index === 0 && 'bg-light-white'
								}  ${active !== menu.link && 'text-primary'}`}
								onClick={() => {
									handleMenuClick(index);
									if (menu.title === 'logout') {
										logoutUser();
									}
								}}
							>
								<div className="flex items-center gap-x-4">
									<Image
										src={menu.src}
										className={`relative object-contain w-5 h-5  ${
											menu.title === 'logout'
												? 'left-[3px]'
												: ''
										}`}
										alt=""
									/>
									<div
										className={`${
											!open && 'hidden'
										} text-black origin-left duration-200 text-[16px] font-[400] ${
											clickedMenu === index ? 'text-primary font-semibold' : ''
										}  ${
											active === menu.link && 'text-primary font-semibold'
										} `}
									>
										{t(menu.title)}
									</div>
								</div>
								{menu.gap && (
									<div
										className={`${
											!open && 'w-[20px] mt-5'
										} w-[200px] h-[1.3px] mt-5 border-t-1 border-black bg-black `}
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
