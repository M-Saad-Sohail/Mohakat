import React from 'react';
import { hero__image } from './../../../../../assests';
import Button from './../../../../UI/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import { getDirection } from '../../../../../utils/get-direction';
const HeroSection = () => {
	const { locale = 'en' } = useRouter();
	const int = useIntl();
	const title = int.formatMessage({ id: 'landingpage.hero.title' });
	const description = int.formatMessage({ id: 'landingpage.hero.description' });

	const dir = getDirection(locale);

	return (
		<div
			dir={dir}
			className="w-full h-full flex justify-center gap-x-16 items-center"
		>
			<div className="w-[40%] px-[54px]">
				<h1 className="text-primary text-[52px] font-bold">
					<FormattedMessage id="landingpage.hero.title" />
				</h1>
				<p className="text-[18px] my-4">
					<FormattedMessage id="landingpage.hero.description" />
				</p>
				<Button
					localeId="landingpage.hero.cta"
					title="Become a sponsor"
					className="max-w-[200px]"
				/>
			</div>
			<div>
				<Image
					alt="hero-image"
					src={hero__image}
					style={{ maxWidth: '100%' }}
					className="h-screen"
				/>
			</div>
		</div>
	);
};

export default HeroSection;
