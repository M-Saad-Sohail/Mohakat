'use client'
import React from 'react';
import { hero__image } from '@/assests/index';
import Button from '@/components/UI/Button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useDirection from '@/hooks/useDirection';
import useLocaleRouter from '@/hooks/useLocaleRouter';

const HeroSection = () => {
	const t = useTranslations('LandingPage.hero')
	const { dir, url, replace } = useLocaleRouter();
	return (
		<div
			dir={dir}
			className="w-full h-full flex justify-between px-1 pr-5 gap-x-16 items-center"
		>
			<div className="w-[50%] px-[54px]">
				<h1 className="text-primary text-[52px] font-bold">
					{t('title')}
				</h1>
				<p className="text-[18px] my-4">
					{t('description')}
				</p>
				<Button
					title={t('cta')}
					onClick={() => {
						replace('/become-sponsor');
					}}
					className="max-w-[200px]"
				/>
			</div>
			<div>
				<Image
					alt="hero-image"
					src={hero__image}
					style={{ maxWidth: '100%' }}
					className="h-auto"
					loading="lazy" 
				/>
			</div>
		</div>
	);
};

export default HeroSection;
