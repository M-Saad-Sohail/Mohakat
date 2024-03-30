'use client';
import React from 'react';
import { consult } from '@/assests/index';
import Button from '@/components/UI/Button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import GazaMap from '../GazaMap';
import { PATHS } from '@/contants';

const HeroSection = () => {
	const t = useTranslations('LandingPage.hero');
	const { dir, replace } = useLocaleRouter();
	return (
		<>
			<div
				dir={dir}
				className="w-[80%] mx-auto my-[5%] h-full flex justify-center px-1 pr-5 gap-x-16 items-center text-center"
			>
				<div className="w-[80%] mx-auto my-[5%]">
					<h1 className="text-primary text-[52px] font-bold">{t('title')}</h1>
					<p className="text-[18px] my-4">{t('description')}</p>
					<Button
						title={t('cta')}
						onClick={() => {
							replace(PATHS.BECOME_SPONSOR);
						}}
						className="max-w-[200px]"
					/>
				</div>
			</div>
			<div style={{ marginTop: '-310px' }}>
				<GazaMap />
				<Image
					alt="hero-image"
					src={consult}
					style={{
						maxWidth: '100%',
						marginLeft: '1000px',
						marginTop: '-500px',
					}}
					className="h-auto"
					loading="lazy"
				/>
			</div>
		</>
	);
};

export default HeroSection;
