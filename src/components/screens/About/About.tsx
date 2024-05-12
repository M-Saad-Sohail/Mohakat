'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getJson } from '@/api/api.instances';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { setIsLandingStateAction } from '@/state/landingpage';
import { RootState } from '@/state/store';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromLocalStorage } from '@/utils/auth';
import Link from 'next/link';
import { PATHS } from '@/contants';
import enLogo from '@/assests/svgs/logo_En.svg';
import arLogo from '@/assests/svgs/logo_Ar.svg';
// import Logo from '@/assests/images/test.png';
import { logo } from '@/assests';

import SponserMain from '../LandingPage/Sponsers/SponserMain';
import IntiationMain from '../LandingPage/Intiation/IntiationMain';
import PartnersSection from '../LandingPage/PartnersSection';
import TestimonialSlider from '../LandingPage/TestinomialSlider';
import AboutSection from '../LandingPage/AboutSection';
import Heading from '@/components/ui/Heading/Heading';
import Button from '@/components/ui/LandingPage/Button';
import Image from 'next/image';

interface AboutDataType {
	heading: string;
	description: string;
}

const About = () => {
	const user = getUserFromLocalStorage();
	const t = useTranslations('About');
	const t1 = useTranslations('HeroMainSection.btns');
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const [aboutData, setAboutData] = useState<AboutDataType[]>([]);
	const [item, setItem] = useState<any>([]);
	const [activeTab, setActiveTab] = useState<number>(0);
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

	useEffect(() => {
		filterItem(activeTab);
	}, [aboutData, activeTab]);

	const filterItem = (tabNum: any) => {
		if (tabNum === 0) {
			setItem(aboutData[0]?.description);
		} else if (tabNum === 1) {
			setItem(aboutData[1]?.description);
		} else if (tabNum === 2) {
			setItem(aboutData[2]?.description);
		}
	};

	return (
		<>
			<section className="relative z-[50] pt-6 pb-6">
				<div
					dir={dir}
					className=" md:w-[80%] py-12 w-[90%] mx-auto animated-div "
				>
					<div className=" flex flex-col gap-10">
						{/* main section */}
						<div className="flex md:flex-row flex-col justify-center items-center md:gap-32 gap-10 mb-10">
							{/* img div */}
							<div className="img_div flex justify-center items-start flex-1 ">
								<Image
									src={
										currentPath === 'en' || currentPath === 'tr'
											? enLogo
											: arLogo
									}
									alt=""
									width={250}
									height={100}
									// className=" w-full h-full"
								/>
							</div>

							<div className=" flex flex-1 flex-col md:justify-start md:items-start justify-center items-center gap-5 md:mt-5">
								{/* tabs */}
								<div className=" flex md:justify-start justify-center items-center md:items-start md:w-[90%] w-full gap-8 h-8">
									<h2
										onClick={() => {
											filterItem(0);
											setActiveTab(0); // Set active tab on click
										}}
										className={`md:text-xl text-base font-semibold cursor-pointer menu-tab-h2 ${activeTab === 0 ? 'active-tab' : ''}`}
									>
										{aboutData[0]?.heading}
									</h2>
									<h2
										onClick={() => {
											filterItem(1);
											setActiveTab(1); // Set active tab on click
										}}
										className={`md:text-xl text-base font-semibold cursor-pointer menu-tab-h2 ${activeTab === 1 ? 'active-tab' : ''}`}
									>
										{aboutData[1]?.heading}
									</h2>
									<h2
										onClick={() => {
											filterItem(2);
											setActiveTab(2); // Set active tab on click
										}}
										className={`md:text-xl text-base font-semibold cursor-pointer menu-tab-h2 ${activeTab === 2 ? 'active-tab' : ''}`}
									>
										{aboutData[2]?.heading}
									</h2>
								</div>

								<div className=" md:w-[90%] w-full">
									<p className="md:text-[18px] text-sm font-light text-justify leading-6">
										{item}
									</p>
								</div>
							</div>
						</div>

						{/* remaining sections */}
						<SponserMain currentPath={currentPath} />
						{!user && (
							<div className="flex md:flex-nowrap flex-wrap gap-4 justify-center">
								<Link href={url(PATHS.BECOME_SPONSOR)}>
									<Button title={t1('BecomeaSponser.title')} Color="#ae6667" />
								</Link>
							</div>
						)}
						<PartnersSection isAbout={true} />
					</div>
				</div>
			</section>
		</>
	);
};

export default About;
