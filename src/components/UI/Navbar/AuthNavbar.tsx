import React, { useState } from 'react';
import { logo } from '@/assests';
import { Links } from '@/contants';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import LangSelector from '../LandSelector';
import { useTranslations } from 'next-intl';
import useDirection from '@/hooks/useDirection';
import useLocaleRouter from '@/hooks/useLocaleRouter';

type IProps = {
	isLoggedIn: boolean;
};
const AuthNavbar = ({ isLoggedIn }: IProps) => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const handleMenuClick = () => {
		setOpen(!open);
		toggleBodyScrolling();
	};
	const toggleBodyScrolling = () => {
		const body = document.querySelector('body');
		if (body) {
			body.style.overflow = open ? 'auto' : 'hidden';
		}
	};
	const t = useTranslations('Navbar');
	const { url, dir, locale, replace, changeLocale } = useLocaleRouter();

	if (!pathname) {
		return null;
	}

	return (
		<div dir={dir} className="bg-[#FCFCFC] h-fit shadow-md">
			<div className="flex items-center justify-between py-4 mobile:pt-4 mx-10">
				<div className="flex items-center ">
					<Link locale={locale} href={url('/')}>
						<Image src={logo} alt="Logo" className="mx-2 h-14 w-14" />
					</Link>
				</div>
				<div className="py-2 hidden md:flex -ml-20">
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
				<div className="flex flex-row items-center justify-center  gap-x-4">
					<LangSelector
						name="language"
						value={locale}
						title=""
						onChange={(e) => {
							changeLocale(e.target.value);
						}}
						options={[
							{ label: 'EN', value: 'en' },
							{ label: 'AR', value: 'ar' },
							{ label: 'TR', value: 'tr' },
						]}
						className="px-4"
					/>
					<Link
						href={url('/sign-in')}
						locale={locale}
						className={`px-4 py-3 duration-500 md:flex hidden float-right mr-4 border-2 border-primary text-primary rounded-md font-bold `}
					>
						{t('cta.signin')}
					</Link>
					<Link
						href={url(`/become-sponsor`)}
						locale={locale}
						className={`py-3 duration-500 md:flex hidden float-right mr-4 border bg-primary text-white px-3 rounded-md font-bold shadow-custom border-main`}
					>
						{t('cta.become-sponsor')}
					</Link>
				</div>

				<div
					onClick={handleMenuClick}
					className={` ${
						isLoggedIn
							? 'text-xl md:hidden cursor-pointer float-right ml-3'
							: 'hidden'
					}`}
				>
					{/* {<img src={menu} alt="menu" className="h-8 w-8" />} */}
				</div>
			</div>
			{open && (
				<div className={`md:hidden  px-6 w-full bg-[#FCFCFC] pb-3`}>
					<div className="mt-7">
						{Links.map((link) => (
							<>
								<Link
									key={link.name}
									onClick={handleMenuClick}
									href={url(link.link)}
									locale={locale}
									className="block py-3 duration-500  border-[#4d4d4d]  border-b pl-4 mt-4"
								>
									{link.name}
								</Link>
							</>
						))}
					</div>
					{isLoggedIn ? (
						<>
							<Link
								href={url('/')}
								onClick={() => {}}
								locale={locale}
								className="block py-3 duration-500  pl-4 mt-4 mb-3 border-[#4d4d4d]  border-b"
							>
								Sign In
							</Link>
							<Link
								href={url('/')}
								onClick={() => {}}
								locale={locale}
								className="block py-3 duration-500  pl-4 mt-4 mb-3 border-[#4d4d4d]  border-b"
							>
								Become a Sponsor
							</Link>
						</>
					) : null}
				</div>
			)}
		</div>
	);
};

export default AuthNavbar;
