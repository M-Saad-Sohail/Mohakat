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
	const [imagesData1, setImagesData1] = useState<any>();
	const [imagesData2, setImagesData2] = useState<any>();
	const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
	const [currentImageIndex2, setCurrentImageIndex2] = useState(0);

	const nextImageFirst = () => {
		setCurrentImageIndex1(
			(prevIndex) => (prevIndex + 1) % (imagesData1 && imagesData1.length),
		);
	};

	const prevImageFirst = () => {
		setCurrentImageIndex1(
			(prevIndex) =>
				(prevIndex - 1 + (imagesData1 && imagesData1.length)) %
				(imagesData1 && imagesData1.length),
		);
	};

	const nextImageSecond = () => {
		setCurrentImageIndex2(
			(prevIndex) => (prevIndex + 1) % (imagesData1 && imagesData1.length),
		);
	};

	const prevImageSecond = () => {
		setCurrentImageIndex2(
			(prevIndex) =>
				(prevIndex - 1 + (imagesData1 && imagesData1.length)) %
				(imagesData1 && imagesData1.length),
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex1(
				(prevIndex) => (prevIndex + 1) % (imagesData1 && imagesData1.length),
			);
		}, 3000);

		return () => clearInterval(interval);
	}, [imagesData1 && imagesData1]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex2(
				(prevIndex) => (prevIndex + 1) % (imagesData2 && imagesData2.length),
			);
		}, 3000);

		return () => clearInterval(interval);
	}, [imagesData2 && imagesData2]);

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

	const fetchHeroImages = async () => {
		const res = await getJson(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-hero-img`,
		);
		if (res.success) {
			setImagesData1(res.heroSlider.slice(0, 3));
			setImagesData2(res.heroSlider.slice(3));
			dispatch(
				setIsLandingStateAction({
					key: 'heroSlider',
					value: res.heroSlider,
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
			if (data.heroSlider) {
				setImagesData1(data.heroSlider.slice(0, 3));
				setImagesData2(data.heroSlider.slice(3));
			} else {
				fetchHeroImages();
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<section
			dir={dir}
			className="md:w-[80%] w-[90%] grid md:grid-cols-3 grid-cols-1 gap-8 mx-auto mt-14 mb-10 animated-div"
		>
			<div className="sidebar-about flex flex-col justify-center items-start px-8 py-8 gap-3 bg-[#75846a] rounded-[15px] transition-all duration-500 ease-out transform-gpu hover:scale-[1.07] cursor-pointer">
				<div className=" absolute left-0 bg-herosection w-full h-full opacity-30"></div>
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
						<p className=" text-sm font-semibold leading-6 text-[#888]">
							{aboutData[1]?.description}
						</p>
					</div>
					<div className="about-card-image mt-4  transition-all duration-500 ease-out transform-gpu hover:scale-[1.07] ">
						<img
							src={
								(imagesData1 &&
									imagesData1[currentImageIndex1]?.heroSliderImg) ||
								'/images/light-gray-background.png'
							}
							alt="img"
							width={100}
							height={100}
							className="about-card-image opacity-80"
						/>
						<div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between items-center pointer-events-none">
							<button
								onClick={prevImageFirst}
								className="cursor-pointer pointer-events-auto"
							>
								{currentPath === 'ar' ? (
									<IoIosArrowForward className=" text-6xl text-white" />
								) : (
									<IoIosArrowBack className=" text-6xl text-white" />
								)}
							</button>
							<button
								onClick={nextImageFirst}
								className="cursor-pointer pointer-events-auto"
							>
								{currentPath === 'ar' ? (
									<IoIosArrowBack className=" text-6xl text-white" />
								) : (
									<IoIosArrowForward className=" text-6xl text-white" />
								)}
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
						<p className=" text-sm font-semibold leading-6 text-[#888]">
							{aboutData[2]?.description}
						</p>
					</div>
					<div className="about-card-image mt-4  transition-all duration-500 ease-out transform-gpu hover:scale-[1.07] ">
						<img
							src={
								(imagesData2 &&
									imagesData2[currentImageIndex2]?.heroSliderImg) ||
								'/images/light-gray-background.png'
							}
							alt="img"
							width={100}
							height={100}
							className="about-card-image opacity-80"
						/>
						<div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between items-center pointer-events-none">
							<button
								onClick={prevImageSecond}
								className="cursor-pointer pointer-events-auto"
							>
								{currentPath === 'ar' ? (
									<IoIosArrowForward className=" text-6xl text-white" />
								) : (
									<IoIosArrowBack className=" text-6xl text-white" />
								)}
							</button>
							<button
								onClick={nextImageSecond}
								className="cursor-pointer pointer-events-auto"
							>
								{currentPath === 'ar' ? (
									<IoIosArrowBack className=" text-6xl text-white" />
								) : (
									<IoIosArrowForward className=" text-6xl text-white" />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutLandingPage;
