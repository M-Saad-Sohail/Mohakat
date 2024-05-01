import { getJson } from '@/api/api.instances';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { setIsLandingStateAction } from '@/state/landingpage';
import { RootState } from '@/state/store';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface AboutDataType {
	heading: string;
	description: string;
}

const AboutSection = () => {
	const t = useTranslations('FAQ');
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1);
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
		<div
			dir={dir}
			className="md:w-[80%] w-[90%] mx-auto mt-14 mb-10 grid md:grid-cols-2 grid-cols-1 gap-3 animated-div"
		>
			<div className=" flex flex-col gap-5 bg-[#E8C08A] rounded-[20px] py-8 md:px-7 px-6 custom-box-shadow feature-shadow">
				<h3 className="md:text-3xl text-2xl font-semibold">
					{aboutData[0]?.heading}
				</h3>
				<div className="md:text-[20px] leading-8 text-lg font-semibold ">
					{aboutData[0]?.description}
					{/* {aboutData[0]?.description.split('.').map((item, i) => {
						if (aboutData[0].description.split('.').length - 1 === i) return;
						return <p key={i}>{item}.</p>;
					})} */}
				</div>
			</div>
			<div className=" flex flex-col gap-3">
				<div className="flex flex-col gap-[6px] bg-[#8DAE8E] rounded-[20px] p-6 custom-box-shadow feature-shadow">
					<h3 className="md:text-xl text-lg font-semibold">
						{aboutData[1]?.heading}
					</h3>
					<p className="md:text-base text-sm font-light">
						{aboutData[1]?.description}
					</p>
				</div>
				<div className="flex flex-col gap-[6px] bg-[#CF7475] rounded-[20px] p-6 custom-box-shadow feature-shadow">
					<h3 className="md:text-xl text-lg font-semibold">
						{aboutData[2]?.heading}
					</h3>
					<p className="md:text-base text-sm font-light">
						{aboutData[2]?.description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutSection;
