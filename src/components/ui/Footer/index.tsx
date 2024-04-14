import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// ICONS
import Logo from '@/assests/icons/newlogo.svg';
import Facebook from '@/assests/icons/fb.png';
import Twitter from '@/assests/icons/twitter.png';
import Linkedin from '@/assests/icons/linkedin.png';

const Footer = () => {
	const t = useTranslations('Footer');
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
					<div className=" hidden md:flex gap-8">
						<Link href={''}>
							<h3 className=" text-sm font-medium">{t('home')}</h3>
						</Link>
						<Link href={''}>
							<h3 className=" text-sm font-medium">{t('families')}</h3>
						</Link>
						<Link href={''}>
							<h3 className=" text-sm font-medium">{t('faqs')}</h3>
						</Link>
						<Link href={''}>
							<h3 className=" text-sm font-medium">{t('contact')}</h3>
						</Link>
					</div>
					{/* social icons */}
					<div className=" flex gap-3">
						<Image src={Facebook} alt="fb_logo" />
						<Image src={Twitter} alt="twitter_logo" />
						<Image src={Linkedin} alt="link_logo" />
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
