import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImg from '@/assests/images/landing-page/light-gray-background.png';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getJson } from '@/api/api.instances';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setIsLandingStateAction } from '@/state/landingpage';

const PartnersSection = ({ isAbout }: { isAbout?: boolean }) => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const { url, dir, locale, changeLocale } = useLocaleRouter();

	const settings1: any = {
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		autoplay: true,
		speed: 5000,
		autoplaySpeed: 2000,
		cssEase: 'linear',

		responsive: [
			{
				breakpoint: 768,
				setting: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 520,
				setting: {
					slidesToShow: 1,
				},
			},
		],
	};

	const settings2: any = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		autoplay: true,
		speed: 5000,
		autoplaySpeed: 2000,
		cssEase: 'linear',

		responsive: [
			{
				breakpoint: 768,
				setting: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 520,
				setting: {
					slidesToShow: 1,
				},
			},
		],
	};
	const [partnerData, setPartnerData] = useState<any>();
	const t = useTranslations('OurPartner');

	const fetchPartners = () => {
		(async () => {
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-partner`,
			);
			if (res.success) {
				setPartnerData(res.partner);
				dispatch(
					setIsLandingStateAction({
						key: 'partner',
						value: res.partner,
					}),
				);
			}
		})();
	};

	useEffect(() => {
		if (data.partner) {
			setPartnerData(data.partner);
		} else {
			fetchPartners();
		}
	}, []);
	return (
		<>
			<section
				dir={dir}
				className={` ${isAbout ? 'md:w-full' : 'md:w-[80%]'} w-[90%] mx-auto flex flex-col gap-8 py-12`}
			>
				<div>
					<h2 className=" md:text-3xl text-2xl font-semibold">
						{' '}
						{t('title')}{' '}
					</h2>
				</div>

				{/* partners card */}

				{/* laptop screen */}
				<div className="hidden md:flex gap-2">
					<Slider {...settings1} className=" w-full">
						{partnerData?.map((item: any, i: any) => {
							return (
								<div key={i} className="slide">
									<div className=" bg-[#FFFFFF] rounded-3xl p-10 w-[200px] h-[200px] shadow-md ring ring-gray-50 ring-opacity-40 feature-shadow">
										<Image
											src={(partnerData && item?.partnerImg) || defaultImg}
											alt="img"
											width={200}
											height={200}
										/>
									</div>
								</div>
							);
						})}
					</Slider>
				</div>

				{/* mobile screen */}
				<div className=" md:hidden flex gap-2">
					<Slider {...settings2} className=" w-full">
						{partnerData?.map((item: any, i: number) => {
							return (
								<div key={i} className="slide">
									<div className=" bg-[#FFFFFF] rounded-3xl p-10 w-[250px] h-[250px] shadow-md ring ring-gray-50 ring-opacity-40">
										<Image
											src={(partnerData && item?.partnerImg) || defaultImg}
											alt="img"
											width={200}
											height={200}
										/>
									</div>
								</div>
							);
						})}
					</Slider>
				</div>
			</section>
		</>
	);
};

export default PartnersSection;
