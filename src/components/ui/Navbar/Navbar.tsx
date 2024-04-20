'use client';
import React, { useEffect, useState } from 'react';
import { logo } from '@/assests';
import Logo from '@/assests/icons/newlogo.svg';
import { Links, PATHS } from '@/contants';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LangSelector from '../LangSelector';
import { useTranslations } from 'next-intl';
import useDirection from '@/hooks/useDirection';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { getUserFromLocalStorage } from '@/utils/auth';
import { UserType } from '@/state/user/types';
import { TbBasketDollar } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import CurrencySelector from '../CurrencySelector';

const AuthNavbar = ({
	setIsCartOpen,
}: {
	setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const cartItems = useSelector((state: any) => state.cart);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const [user, setUser] = useState<UserType | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
		<div dir={dir} className="h-fit hidden md:block">
			<div className="flex items-center justify-between py-4 mx-10 mobile:pt-4">
				<div className=" flex gap-6">
					<div className="flex items-center ">
						<Link locale={locale} href={url('/')}>
							<Image
								src={currentPath === 'en' || currentPath === 'tr' ? logo : Logo}
								alt="Logo"
								width={56}
								height={56}
								className="mx-2 h-14 w-14"
							/>
						</Link>
					</div>
					<div className="hidden py-2 md:flex">
						{Links.map((link, i) => (
							<Link
								key={link.name}
								href={url(link.link)}
								locale={locale}
								className={`block py-2 px-4 duration-500  ${link.link === currentPathName ? ' font-semibold text-xl' : ' font-normal text-lg'}`}
							>
								{t(link.localeId)}
							</Link>
						))}
					</div>
				</div>
				<div className="flex flex-row items-center justify-center gap-x-3">
					<LangSelector
						name="language"
						value={locale}
						title=""
						onChange={() => {}}
						handleChange={changeLocale}
						className="px-3"
					/>
					{isLoggedIn ? (
						<>
							<Link
								href={`/${user?.language ?? locale}${PATHS.DASHBOARD}`}
								replace={currentPathName !== '/'}
								locale={user?.language ?? locale}
								className={`duration-500 md:flex hidden float-right mr-2 bg-[#CF7475] rounded-[20px] font-semibold text-white text-sm border-none outline-none px-6 py-2 w-fit`}
							>
								{t('cta.go-to-dashboard')}
							</Link>
						</>
					) : (
						<>
							<Link
								href={url(PATHS.LOGIN)}
								locale={locale}
								className={` duration-500 md:flex hidden float-right mr-2 bg-black rounded-[20px] font-semibold text-white text-sm border-none outline-none px-6 py-2 w-fit `}
							>
								{t('cta.signin')}
							</Link>
							<Link
								href={url(PATHS.BECOME_SPONSOR)}
								locale={locale}
								className={`duration-500 md:flex hidden float-right mr-2 bg-[#8DAE8E] rounded-[20px] font-semibold text-white text-sm border-none outline-none px-6 py-2 w-fit`}
							>
								{t('cta.become-sponsor')}
							</Link>
						</>
					)}
					<CurrencySelector />
				</div>
			</div>
		</div>
	);
};

export default AuthNavbar;
