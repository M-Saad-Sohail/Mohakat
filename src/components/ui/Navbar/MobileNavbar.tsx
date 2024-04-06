import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { logo } from '@/assests';
import EarthSvg from '@/assests/images/landing-page/earth.svg';
import ProfileSvg from '@/assests/images/landing-page/profile.svg';
import HamBurgurSvg from '@/assests/images/landing-page/hamburgur.svg';
import CrossSvg from '@/assests/images/landing-page/cross.svg';
import { Links } from '@/contants';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { getUserFromLocalStorage } from '@/utils/auth';
import { UserType } from '@/state/user/types';

const MobileNavbar = () => {
	const pathname = usePathname();
	const [user, setUser] = useState<UserType | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [active, setActive] = useState(false);

	const t = useTranslations('Navbar');
	const { url, dir, locale, changeLocale } = useLocaleRouter();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		setIsLoggedIn(!!user);
		setUser(user);
	}, []);

	if (!pathname) {
		return null;
	}

	let currentPathName = pathname
		.replace('/en', '')
		.replace('/ar', '')
		.replace('/tr', '');

	if (currentPathName === '') {
		currentPathName = '/';
	}
	return (
		<>
			<div className={`flex flex-col ${active && 'active'}`}>
				<div className="flex justify-between items-center px-5 py-2 my-5 border-b-[0.5px] border-[#00000080] h-12">
					{/* logo */}
					<div>
						<Image className="mx-2 h-12 w-12" src={logo} alt="" />
					</div>

					{/* icons */}
					<div className=" flex gap-3">
						{!active && (
							<>
								<Image src={EarthSvg} alt="" />
								<Image src={ProfileSvg} alt="" />
							</>
						)}
						<Image
							onClick={() => {
								setActive((prev) => !prev);
							}}
							src={active ? CrossSvg : HamBurgurSvg}
							alt=""
						/>
					</div>
				</div>

				<div className="navbar-lists py-2 px-6">
					{Links.map((link, i) => (
						<Link
							key={link.name}
							href={url(link.link)}
							locale={locale}
							className={`block py-2 px-6 duration-500  ${link.link === currentPathName ? ' font-semibold text-xl' : ' font-normal text-lg'}`}
						>
							{t(link.localeId)}
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default MobileNavbar;
