import useLocaleRouter from '@/hooks/useLocaleRouter';
import React, { useEffect, useState } from 'react';
import { FiCodesandbox } from 'react-icons/fi';
import { setIsLandingStateAction } from '@/state/landingpage';
import { getJson } from '@/api/api.instances';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { RootState } from '@/state/store';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface AboutDataType {
	heading: string;
	description: string;
}

const AboutLandingPage = () => {
	const t = useTranslations('FAQ');
	const t1 = useTranslations('About');
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1);
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const [aboutData, setAboutData] = useState<AboutDataType[]>([]);
	const [imagesData, setImagesData] = useState<any>();

	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const nextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prevIndex) => (prevIndex - 1 + imagesData.length) % imagesData.length,
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [imagesData && imagesData.length]);

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
		if (data.heroSlider) {
			setImagesData(data.heroSlider);
			console.log(data.heroSlider);
		}
	}, [data.heroSlider]);

	return (
		<section
			dir={dir}
			className="md:w-[80%] w-[90%] grid grid-cols-3 gap-8 mx-auto mt-14 mb-10  animated-div"
		>
			<div className="sidebar-about flex flex-col justify-center items-start px-8 py-8 gap-3 bg-[#8DAE8E] rounded-[15px] transition-all duration-500 ease-out transform-gpu hover:scale-[1.07] cursor-pointer">
				<span>
					<FiCodesandbox className=" text-6xl text-[#fff] mx-0 w-full" />
				</span>

				<p className=" text-xl font-semibold text-[#fff] tracking-[5px] uppercase">
					{aboutData[0]?.heading}
				</p>
				<h2 className=" text-lg font-medium text-[#fff]">
					{aboutData[0]?.description}
				</h2>
			</div>
			<div className="  flex gap-8 mx-auto">
				<div className="flex flex-1 justify-between flex-col gap-2 mx-auto">
					<div className=" flex flex-col gap-2">
						<h3 className=" text-2xl text-[#171717] font-semibold">
							{aboutData[1]?.heading}
						</h3>
						<p className=" text-sm font-medium leading-6 text-[#888]">
							{aboutData[1]?.description}
						</p>
					</div>
					<div className="about-card-image mt-4  transition-all duration-500 ease-out transform-gpu hover:scale-[1.07] ">
						<img
							src={
								(imagesData && imagesData[currentImageIndex]?.heroSliderImg) ||
								'/images/light-gray-background.png'
							}
							alt="img"
							width={100}
							height={100}
							className="about-card-image opacity-80"
						/>
						<div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between items-center pointer-events-none">
							<button
								onClick={prevImage}
								className="cursor-pointer pointer-events-auto"
							>
								<IoIosArrowBack className=" text-6xl text-white" />
							</button>
							<button
								onClick={nextImage}
								className="cursor-pointer pointer-events-auto"
							>
								<IoIosArrowForward className=" text-6xl text-white" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="  flex gap-8 mx-auto">
				<div className="flex flex-1 justify-between flex-col gap-2 mx-auto">
					<div className=" flex flex-col gap-2">
						<h3 className=" text-2xl text-[#171717] font-semibold">
							{aboutData[2]?.heading}
						</h3>
						<p className=" text-sm font-medium leading-6 text-[#888]">
							{aboutData[2]?.description}
						</p>
					</div>
					<div className="about-card-image mt-4  transition-all duration-500 ease-out transform-gpu hover:scale-[1.07] ">
						<img
							src={
								(imagesData && imagesData[currentImageIndex]?.heroSliderImg) ||
								'/images/light-gray-background.png'
							}
							alt="img"
							width={100}
							height={100}
							className="about-card-image opacity-80"
						/>
						<div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between items-center pointer-events-none">
							<button
								onClick={prevImage}
								className="cursor-pointer pointer-events-auto"
							>
								<IoIosArrowBack className=" text-6xl text-white" />
							</button>
							<button
								onClick={nextImage}
								className="cursor-pointer pointer-events-auto"
							>
								<IoIosArrowForward className=" text-6xl text-white" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutLandingPage;
