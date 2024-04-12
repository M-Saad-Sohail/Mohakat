import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { logo } from '@/assests';
import EarthSvg from '@/assests/images/landing-page/earth.svg';
import ProfileSvg from '@/assests/images/landing-page/profile.svg';
import HamBurgurSvg from '@/assests/images/landing-page/hamburgur.svg';
import CrossSvg from '@/assests/images/landing-page/cross.svg';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { getUserFromLocalStorage } from '@/utils/auth';
import { UserType } from '@/state/user/types';
import { Links, PATHS } from '@/contants';
import { TbBasketDollar } from 'react-icons/tb';

const MobileNavbar = ({
	setIsCartOpen,
}: {
	setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
			<div className={` md:hidden flex flex-col ${active && 'active'}`}>
				<div className="flex justify-between items-center px-5 py-3 border-b-[0.5px] border-[#00000080]">
					{/* logo */}

					<Image className="mx-2 h-12 w-12" src={logo} alt="" />

					{/* icons */}
					<div className=" flex gap-3">
						{!active && (
							<>
								<Image src={EarthSvg} alt="" />
								{/* <Image src={ProfileSvg} alt="" /> */}
								<div
									className=" relative cursor-pointer"
									onClick={() => setIsCartOpen(true)}
								>
									<span className=" absolute top-0 right-0 bg-[#CF7475] text-white text-[8px] rounded-[50%] px-[5px] pt-[2px] pb-[1px]">
										1
									</span>
									<TbBasketDollar className=" text-[32px]" />
								</div>
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

				<div className="navbar-lists py-5">
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
					<div className=" flex justify-start items-start mt-5 py-2 px-6">
						<Link
							href={url(PATHS.LOGIN)}
							locale={locale}
							className={` duration-500 flex float-right mr-4 bg-black rounded-[20px] font-semibold text-white text-sm border-none outline-none px-6 py-2 w-fit `}
						>
							{t('cta.signin')}
						</Link>
						<Link
							href={url(PATHS.BECOME_SPONSOR)}
							locale={locale}
							className={`duration-500 flex float-right mr-4 bg-[#CF7475] rounded-[20px] font-semibold text-white text-sm border-none outline-none px-6 py-2 w-fit`}
						>
							{t('cta.become-sponsor')}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default MobileNavbar;
