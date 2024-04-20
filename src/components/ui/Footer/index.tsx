import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// ICONS
import Logo from '@/assests/icons/newlogo.svg';
import Facebook from '@/assests/icons/fb.png';
import Twitter from '@/assests/icons/twitter.png';
import Linkedin from '@/assests/icons/linkedin.png';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { usePathname } from 'next/navigation';

// REACT ICONS
import { RiFacebookBoxFill } from 'react-icons/ri';
import { FaTwitterSquare, FaFacebookSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';

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
			<div className=" bg-[#F8F8F8] flex flex-col gap-8 md:px-20 px-8 py-10">
				{/* first div */}
				<div className=" flex justify-between items-center">
					{/* logo */}
					<div>
						<Image src={Logo} alt="logo" />
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
									className="navbar-link text-base font-medium hover:text-lg transition-all duration-300"
								>
									<h3>{t(`${link.title}`)}</h3>
								</Link>
							);
						})}
					</div>
					{/* social icons */}
					<div className=" flex gap-3">
						<FaFacebookSquare className=" text-[26px] cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#CF7475]" />
						<FaTwitterSquare className=" text-[26px] cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#CF7475]" />
						<FaLinkedin className=" text-[26px] cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#CF7475]" />
					</div>
				</div>

				{/* second (line) div */}
				<div>
					<hr className="h-[3px] bg-[#00000080] border-0" />
				</div>

				{/* third div */}
				<div className=" flex md:justify-center justify-end items-center md:gap-10 gap-4">
					<h3 className="hidden md:flex text-sm font-normal">
						© 2024 {t('MuakhetAllrightsreserved')}
					</h3>
					<Link href={'/'}>
						<h3 className=" md:text-sm text-[13px] font-normal">
							{t('privacypolicy')}
						</h3>
					</Link>
					<Link href={'/'}>
						<h3 className=" md:text-sm text-[13px] font-normal">
							{t('termsofservice')}
						</h3>
					</Link>
				</div>
				<div className="flex justify-center items-center">
					<h3 className="md:hidden flex text-sm font-normal">
						© 2024 {t('MuakhetAllrightsreserved')}
					</h3>
				</div>
			</div>
		</>
	);
};

export default Footer;
