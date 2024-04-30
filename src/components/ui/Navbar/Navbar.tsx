'use client';
import React, { useEffect, useRef, useState } from 'react';
import { logo } from '@/assests';
import Logo from '@/assests/icons/newlogo.svg';
import { Links, PATHS } from '@/contants';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
import CurrencyModal from '../Modals/CurrencyModal';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';

const AuthNavbar = ({
	setIsCartOpen,
}: {
	setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const router = useRouter();
	const cartItems = useSelector((state: any) => state.cart);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const [user, setUser] = useState<UserType | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
	const cancelCurrencyModalButtonRef = useRef(null);
	const currencyState = useSelector((state: any) => state.currency);
	const { logoutUser } = useAuth();

	const t = useTranslations('Navbar');
	const { url, dir, locale, changeLocale } = useLocaleRouter();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		setIsLoggedIn(!!user);
		setUser(user);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				event.target instanceof HTMLElement &&
				!event.target.closest('.profile-dropdown')
			) {
				setDropdownOpen(false);
			}
		};

		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
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
				<div
					className={`flex flex-row items-center justify-center ${isLoggedIn ? 'gap-x-6' : 'gap-x-4'} `}
				>
					<LangSelector
						name="language"
						value={locale}
						title=""
						onChange={() => {}}
						handleChange={changeLocale}
						className="px-1"
					/>
					{!isLoggedIn && (
						<>
							<Link href={url(PATHS.LOGIN)} locale={locale}>
								<Button title={t('cta.signin')} Color="#000000" />
							</Link>
							<Link href={url(PATHS.BECOME_SPONSOR)} locale={locale}>
								<Button title={t('cta.become-sponsor')} Color="#8DAE8E" />
							</Link>
						</>
					)}
					<div
						className="flex items-center justify-center gap-3 border border-black rounded-[50%] w-[30px] md:w-[42px] h-[30px] md:h-10 cursor-pointer currency-dropdown"
						onClick={() => setCurrencyModalOpen((prev) => !prev)}
					>
						<p
							className={` md:text-sm text-[10px] text-black font-bold uppercase`}
						>
							{currencyState?.key}
						</p>
					</div>
					{user?.role === 'user' && (
						<div
							className=" relative cursor-pointer"
							onClick={() => setIsCartOpen(true)}
						>
							<span className=" absolute top-0 right-0 bg-[#CF7475] text-white text-[10px] rounded-[50%] px-[6px] py-[2px]">
								{cartItems.length > 0 ? cartItems.length : '0'}
							</span>
							<TbBasketDollar className=" text-[42px]" />
						</div>
					)}
					{isLoggedIn && (
						<div className=" relative">
							<div
								className=" profile-dropdown cursor-pointer"
								onClick={() => setDropdownOpen((prev) => !prev)}
							>
								<FaUser className=" text-[28px]" />
							</div>
							{dropdownOpen && (
								<div
									className={`${locale === 'ar' ? 'md:left-0 left-0 ' : 'md:right-0 right-0 '} w-48 top-11 shadow-custom bg-white px-2 py-2 rounded-xl absolute flex flex-col gap-2 profile-dropdown z-50`}
								>
									<span
										onClick={() => {
											logoutUser();
											setDropdownOpen((prev) => !prev);
											router.replace(url(PATHS.LOGIN));
										}}
										className="w-full bg-black text-white md:text-sm text-[13px] rounded-xl px-3 py-[6px] text-center  cursor-pointer hover:bg-white border-2 border-transparent hover:border-[#000000] hover:text-[#000000] transition-colors duration-300 ease-in-out  "
									>
										{t('cta.logout')}
									</span>
									<span
										onClick={() => {
											setDropdownOpen((prev) => !prev);
											router.replace(url(PATHS.DASHBOARD));
										}}
										className="w-full bg-[#CF7475] text-white md:text-sm text-[13px] rounded-xl px-3 py-[6px] text-center  cursor-pointer hover:bg-white border-2 border-transparent hover:border-[#CF7475] hover:text-[#CF7475] transition-colors duration-300 ease-in-out  "
									>
										{t('cta.go-to-dashboard')}
									</span>
								</div>
							)}
						</div>
					)}
					<CurrencyModal
						open={currencyModalOpen}
						setOpen={setCurrencyModalOpen}
						cancelButtonRef={cancelCurrencyModalButtonRef}
					/>
				</div>
			</div>
		</div>
	);
};

export default AuthNavbar;
