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

const AuthNavbar = () => {
	const pathname = usePathname();

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const t = useTranslations('Navbar');
	const { url, dir, locale, changeLocale } = useLocaleRouter();


	useEffect(() => {
		const user = getUserFromLocalStorage()
		setIsLoggedIn(!!user)
	}, [])


	if (!pathname) {
		return null;
	}

	return (
		<div dir={dir} className="bg-[#FCFCFC] h-fit shadow-md">
			<div className="flex items-center justify-between py-4 mx-10 mobile:pt-4">
				<div className="flex items-center ">
					<Link locale={locale} href={url('/')}>
						<Image src={logo} alt="Logo" className="mx-2 h-14 w-14" />
					</Link>
				</div>
				<div className="hidden py-2 -ml-20 md:flex">
					{Links.map((link) => (
						<Link
							key={link.name}
							href={url(link.link)}
							locale={locale}
							className="block py-2 px-6 font-bold duration-500 text-[16px] text-primary"
						>
							{t(link.localeId)}
						</Link>
					))}
				</div>
				<div className="flex flex-row items-center justify-center gap-x-4">
					<LangSelector
						name="language"
						value={locale}
						title=""
						onChange={(e) => {
							changeLocale(e.target.value);
						}}
						className="px-4"
					/>
					{isLoggedIn ? (
						<>
							<Link
								href={url(PATHS.DASHBOARD)}
								locale={locale}
								className={`py-3 px-6 duration-500 md:flex hidden float-right mr-4 border bg-primary text-white px-3 rounded-md font-bold shadow-custom border-main`}
							>
								{t('cta.go-to-dashboard')}
							</Link>
						</>
					) : (
						<>
							<Link
								href={url(PATHS.LOGIN)}
								locale={locale}
								className={`px-4 py-3 duration-500 md:flex hidden float-right mr-4 border-2 border-primary text-primary rounded-md font-bold `}
							>
								{t('cta.signin')}
							</Link>
							<Link
								href={url(PATHS.BECOME_SPONSOR)}
								locale={locale}
								className={`py-3 duration-500 md:flex hidden float-right mr-4 border bg-primary text-white px-3 rounded-md font-bold shadow-custom border-main`}
							>
								{t('cta.become-sponsor')}
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthNavbar;
