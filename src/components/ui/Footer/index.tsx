import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// ICONS
import { logo } from '@/assests';
import Logo from '@/assests/icons/newlogo.svg';
import Facebook from '@/assests/icons/fb.png';
import Twitter from '@/assests/icons/twitter.png';
import Linkedin from '@/assests/icons/linkedin.png';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { usePathname } from 'next/navigation';

// REACT ICONS
import { FaTwitterSquare, FaFacebookSquare } from 'react-icons/fa';
import { FaLinkedin, FaSquareInstagram } from 'react-icons/fa6';

const footerLinks = [
	{
		title: 'home',
		link: '/',
	},
	{
		title: 'families',
		link: '/families',
	},
	{
		title: 'faqs',
		link: '/faqs',
	},
	{
		title: 'contact',
		link: '/contact',
	},
];

const Footer = () => {
	const t = useTranslations('Footer');
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);

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
			<div className=" relative bg-[#75846a] flex flex-col gap-8 md:px-20 px-8 py-10">
				<div className=" absolute top-0 left-0 bg-herosection w-full h-full opacity-20"></div>

				{/* first div */}
				<div className=" flex justify-between items-center">
					{/* logo */}
					<div>
						<Image
							src={currentPath === 'ar' ? Logo : logo}
							className={`${currentPath === 'ar' ? ' w-14' : ' w-11'} footer_img_url`}
							id = "footer_logo"
							alt="logo"
						/>
					</div>
					{/* links */}
					<div className=" hidden md:flex items-center gap-8">
						{footerLinks.map((link) => {
							return (
								<Link
									key={link.title}
									href={url(link.link)}
									locale={locale}
									// 		className={`
									// 	${link.link === currentPathName ? 'font-semibold text-base text-[#CF7475]' : 'font-normal text-sm hover:text-[#CF7475]'}
									//   `}
									className="navbar-link text-white text-lg font-medium hover:text-xl transition-all duration-300"
								>
									<h3>{t(`${link.title}`)}</h3>
								</Link>
							);
						})}
					</div>
					{/* social icons */}
					<div className=" flex gap-3">
						{/* fb */}
						<Link
							href={`${currentPath == 'en' ? 'https://www.facebook.com/profile.php?id=61558851476057' : currentPath == 'tr' ? 'https://www.facebook.com/profile.php?id=61558467735301' : 'https://www.facebook.com/moakhatorg/'}`}
							target="_blank"
							className="z-10"
						>
							<FaFacebookSquare className=" text-[30px] text-[#fff] cursor-pointer transition-colors duration-500 ease-out hover:scale-110 rounded-[8px]" />
						</Link>

						{/* twitter */}
						<Link
							href={`${currentPath == 'en' ? 'https://twitter.com/MoakhatEn' : currentPath == 'tr' ? 'https://twitter.com/MoakhatTr' : 'https://twitter.com/moakhatorg'}`}
							target="_blank"
							className="z-10"
						>
							<FaTwitterSquare className=" text-[30px] text-[#fff] cursor-pointer transition-colors duration-500 ease-out hover:scale-110  rounded-[8px]" />
						</Link>

						{/* insta */}

						<Link
							href={`${currentPath == 'en' ? 'https://www.instagram.com/moakhat.en/' : currentPath == 'tr' ? 'https://www.instagram.com/kardesliktr/' : 'https://www.instagram.com/moakhatorgtr/'}`}
							target="_blank"
							className="z-10"
						>
							<FaSquareInstagram className=" text-[30px] text-[#fff] cursor-pointer transition-colors duration-500 ease-out hover:scale-110  rounded-[8px]" />
						</Link>
					</div>
				</div>

				{/* second (line) div */}
				<div>
					<hr className="h-[3px] bg-[#fff] border-0" />
				</div>

				{/* third div */}
				<div className="relative text-white flex md:justify-center justify-center md:items-start items-center">
					<div className=" flex md:justify-center justify-end items-center md:gap-10 gap-4">
						<h3 className="hidden md:flex text-base font-normal">
							© 2024 {t('MuakhetAllrightsreserved')}
						</h3>
						<Link href={'/'}>
							<h3 className=" md:text-base text-[13px] font-normal">
								{t('privacypolicy')}
							</h3>
						</Link>
						<Link href={'/'}>
							<h3 className=" md:text-base text-[13px] font-normal">
								{t('termsofservice')}
							</h3>
						</Link>
					</div>
					<div className=" absolute right-0 hidden md:flex gap-1 items-center text-base font-normal">
						<span className=" font-semibold italic">Powered by</span>
						<Link
							className="navbar-link text-base hover:text-lg transition-all duration-300"
							href={'https://techxudo.com/'}
							target="_blank"
						>
							Techxudo
						</Link>
					</div>
				</div>
				<div className="flex justify-center items-center">
					<h3 className="md:hidden flex text-sm font-normal text-white">
						© 2024 {t('MuakhetAllrightsreserved')}
					</h3>
				</div>
				<div className="flex text-white gap-1 md:hidden justify-center items-center text-sm font-normal">
					<span className=" font-semibold italic">Powered by</span>
					<Link
						className="navbar-link text-sm hover:text-base transition-all duration-300"
						href={'https://techxudo.com/'}
						target="_blank"
					>
						Techxudo
					</Link>
				</div>
			</div>
		</>
	);
};

export default Footer;
