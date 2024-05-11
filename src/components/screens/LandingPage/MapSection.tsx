'use client';
import React from 'react';
import { consult } from '@/assests/index';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import GazaMap from './GazaMap';
import { PATHS } from '@/contants';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import Heading from '@/components/ui/Heading/Heading';

const HeroSection: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
	const t = useTranslations('LandingPage.hero');
	const { dir, replace } = useLocaleRouter();
	return (
		<>
			{/* <div
				dir={dir}
				className="w-[80%] mx-auto h-full flex justify-center px-1 pr-5 gap-x-16 items-center text-center"
			>
				<div className="w-[80%] mx-auto my-[5%]">
					<h1 className="text-primary text-[52px] font-bold">{t('title')}</h1>
					<p className="text-[18px] my-4">{t('description')}</p>
					{!isLoggedIn && <Button
						title={t('cta')}
						onClick={() => {
							replace(PATHS.BECOME_SPONSOR);
						}}
						className="max-w-[200px]"
					/>}
				</div>
			</div> */}
			{/* <section className="relative pt-5 pb-5 w-full h-full bg-herosection ">
			<div className = "bg-[#75846a]"><GazaMap />
				<Image
					alt="hero-image"
					src={consult}
					className=" md:w-32 w-10 h-auto absolute md:bottom-36 bottom-5 right-2"
					loading="lazy"
				/></div>
			
			</section> */}

			<section className=" w-full h-full bg-[#75846a] pt-5 pb-5">
				<div className = "relative">
				<GazaMap />
				<Image
					alt="hero-image"
					src={consult}
					className=" md:w-32 w-10 h-auto absolute md:bottom-36 bottom-5 right-2"
					loading="lazy"
				/>
				</div>
			</section>
		</>
	);
};

export default HeroSection;
