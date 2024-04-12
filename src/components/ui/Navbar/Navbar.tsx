'use client';
import React, { useEffect, useState } from 'react';
import { logo } from '@/assests';
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

const AuthNavbar = ({
	setIsCartOpen,
}: {
	setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const pathname = usePathname();
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
							<Image src={logo} alt="Logo" className="mx-2 h-14 w-14" />
						</Link>
					</div>
					<div className="hidden py-2 md:flex">
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
				<div className="flex flex-row items-center justify-center gap-x-4">
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
								className={`duration-500 md:flex hidden float-right mr-4 bg-[#CF7475] rounded-[20px] font-semibold text-white text-sm border-none outline-none px-6 py-2 w-fit`}
							>
								{t('cta.go-to-dashboard')}
							</Link>
						</>
					) : (
						<>
							<Link
								href={url(PATHS.LOGIN)}
								locale={locale}
								className={` duration-500 md:flex hidden float-right mr-4 bg-black rounded-[20px] font-semibold text-white text-sm border-none outline-none px-6 py-2 w-fit `}
							>
								{t('cta.signin')}
							</Link>
							<Link
								href={url(PATHS.BECOME_SPONSOR)}
								locale={locale}
								className={`duration-500 md:flex hidden float-right mr-4 bg-[#CF7475] rounded-[20px] font-semibold text-white text-sm border-none outline-none px-6 py-2 w-fit`}
							>
								{t('cta.become-sponsor')}
							</Link>

							<div
								className=" relative cursor-pointer"
								onClick={() => setIsCartOpen(true)}
							>
								<span className=" absolute top-0 right-0 bg-[#CF7475] text-white text-[10px] rounded-[50%] px-[6px] py-[2px]">
									1
								</span>
								<TbBasketDollar className=" text-[40px]" />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthNavbar;
