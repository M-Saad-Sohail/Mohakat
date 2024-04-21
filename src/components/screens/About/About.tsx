'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getJson } from '@/api/api.instances';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { setIsLandingStateAction } from '@/state/landingpage';
import { RootState } from '@/state/store';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import SponserMain from '../LandingPage/Sponsers/SponserMain';
import IntiationMain from '../LandingPage/Intiation/IntiationMain';
import PartnersSection from '../LandingPage/PartnersSection';

interface AboutDataType {
	heading: string;
	description: string;
}

const About = () => {
	const t = useTranslations('About');
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const [aboutData, setAboutData] = useState<AboutDataType[]>([]);
	const handleAboutData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setAboutData((prev: any) => [
				...prev,
				{
					heading: data?.heading?.inEnglish,
					description: data?.description?.inEnglish,
				},
			]);
		} else if (path === 'ar') {
			setAboutData((prev: any) => [
				...prev,
				{
					heading: data?.heading?.inArabic,
					description: data?.description?.inArabic,
				},
			]);
		} else if (path === 'tr') {
			setAboutData((prev: any) => [
				...prev,
				{
					heading: data?.heading?.inTurkish,
					description: data?.description?.inTurkish,
				},
			]);
		}
	};

	const fetchAbout = async () => {
		const res = await getJson(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-about`,
		);
		if (res.success) {
			setAboutData([]);
			res.newAbout.map((item: any) => handleAboutData(currentPath, item));
			dispatch(
				setIsLandingStateAction({
					key: 'newAbout',
					value: res.newAbout,
				}),
			);
		}
	};

	useEffect(() => {
		try {
			if (data.newAbout) {
				setAboutData([]);
				data.newAbout.map((item: any) => handleAboutData(currentPath, item));
			} else {
				fetchAbout();
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<section
			className={` md:w-[80%] py-12 w-[90%] mx-auto flex flex-col gap-8 `}
		>
			<div className=" flex flex-col gap-2">
				<h2 className=" md:text-3xl text-2xl font-semibold">{t('title')}</h2>
			</div>
			<div className=" flex flex-col gap-3">
				<div className=" flex flex-col gap-2">
					<h2 className="md:text-3xl text-2xl font-semibold">
						{aboutData[0]?.heading}
					</h2>
					<p className=" md:text-lg text-base font-light">
						{aboutData[0]?.description}
					</p>
					<p className=" md:text-lg text-base font-light">
						{aboutData[1]?.description}
					</p>
					<p className=" md:text-lg text-base font-light">
						{aboutData[2]?.description}
					</p>
				</div>
				<SponserMain currentPath={currentPath} />
				<IntiationMain currentPath={currentPath} />
				<PartnersSection isAbout={true} />
			</div>
		</section>
	);
};

export default About;
