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
import Button from '../LandingPage/Button';

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
					<div className="hidden md:flex items-center">
						{Links.map((link, i) => (
							<Link
								key={link.name}
								href={url(link.link)}
								locale={locale}
								// className={` block py-2 px-4 transition-colors duration-300 ease-in-out  ${link.link === currentPathName ? ' font-semibold text-xl text-[#CF7475]' : ' font-normal text-lg hover:text-[#CF7475]'}`}
								className="navbar-link text-lg font-medium hover:text-xl transition-all duration-300 mx-4"
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
								href={`/${locale}${PATHS.DASHBOARD}`}
								replace={currentPathName !== '/'}
								locale={locale}
							>
								<Button title={t('cta.go-to-dashboard')} Color="#CF7475" />
							</Link>
						</>
					) : (
						<>
							<Link href={url(PATHS.LOGIN)} locale={locale}>
								<Button title={t('cta.signin')} Color="#000000" />
							</Link>
							<Link href={url(PATHS.BECOME_SPONSOR)} locale={locale}>
								<Button title={t('cta.become-sponsor')} Color="#8DAE8E" />
							</Link>
						</>
					)}
					{user?.role === 'user' && (
						<div
							className=" relative cursor-pointer"
							onClick={() => setIsCartOpen(true)}
						>
							<span className=" absolute top-0 right-0 bg-[#CF7475] text-white text-[10px] rounded-[50%] px-[6px] py-[2px]">
								{cartItems.length > 0 ? cartItems.length : '0'}
							</span>
							<TbBasketDollar className=" text-[40px]" />
						</div>
					)}
					<CurrencySelector />
				</div>
			</div>
		</div>
	);
};

export default AuthNavbar;
