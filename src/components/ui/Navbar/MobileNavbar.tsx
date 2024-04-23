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
import CurrencySelector from '../CurrencySelector';
import LangSelector from '../LangSelector';
import { useSelector } from 'react-redux';

const MobileNavbar = ({
	setIsCartOpen,
}: {
	setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const pathname = usePathname();
	const cartItems = useSelector((state: any) => state.cart);
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

					<Link href={url('/')}>
					<Image className="mx-2 h-12 w-12" src={logo} alt="" />
					</Link>

					{/* icons */}
					<div className=" flex items-center gap-5">
						{!active && (
							<>
								<LangSelector
									name="language"
									value={locale}
									title=""
									onChange={() => {}}
									handleChange={changeLocale}
									className=" justify-center w-8 h-8"
								/>
								<CurrencySelector />
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
						<Image
							onClick={() => {
								setActive((prev) => !prev);
							}}
							src={active ? CrossSvg : HamBurgurSvg}
							alt=""
							className=" w-[22px] h-[22px]"
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
