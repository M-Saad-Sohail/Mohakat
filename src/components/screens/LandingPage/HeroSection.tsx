'use client';
import React, { useEffect, useState } from 'react';
import defaultImg from '@/assests/images/landing-page/light-gray-background.png';
import Button from '@/components/ui/LandingPage/Button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getJson } from '@/api/api.instances';

interface HeroDataType {
	heading: string;
	description: string;
}

const HeroSection: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
	const pathname = usePathname();
	const currentPath = pathname?.slice(1);
	const [imagesData, setImagesData] = useState<any>();
	const [currentHeroData, setCurrentHeroData] = useState<HeroDataType>({
		heading: '',
		description: '',
	});

	const handleHeroData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setCurrentHeroData({
				heading: data?.heading?.inEnglish,
				description: data?.description?.inEnglish,
			});
		} else if (path === 'ar') {
			setCurrentHeroData({
				heading: data?.heading?.inArabic,
				description: data?.description?.inArabic,
			});
		} else if (path === 'tr') {
			setCurrentHeroData({
				heading: data?.heading?.inTurkish,
				description: data?.description?.inTurkish,
			});
		}
	};
	useEffect(() => {
		(async () => {
			try {
				const res = await getJson(
					`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-hero`,
				);
				if (res.success) {
					handleHeroData(currentPath, res.newHero[0]);
				}
				const resImg = await getJson(
					`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-hero-img`,
				);
				if (resImg.success) {
					setImagesData(resImg.heroSlider);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<section className="md:w-[80%] w-full h-[85vh] flex items-center mx-auto">
			<div className=" hidden md:grid grid-cols-5 h-[90%] gap-3">
				<div className=" flex flex-col justify-end gap-3">
					<div className=" h-[50%]">
						<Image
							src={(imagesData && imagesData[0].heroSliderImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full rounded-[20px] "
						/>
					</div>
					<div className=" h-[30%]">
						<Image
							src={(imagesData && imagesData[1].heroSliderImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full rounded-[20px] "
						/>
					</div>
				</div>
				<div className=" col-span-3 flex flex-col justify-between">
					<h1 className=" text-3xl text-[#171717] font-bold text-center ">
						{currentHeroData?.heading}
					</h1>
					<p className="text-lg font-light text-center">
						{currentHeroData.description}
					</p>
					<div className=" flex flex-wrap gap-5 justify-center w-[80%] mx-auto">
						<Button title="Donate a Share" className=" bg-[#CF7475]" />
						<Button title="Become a Sponser" className=" bg-[#8DAE8E]" />
						<Button title="Register as Family" className=" bg-[#000000]" />
					</div>
					<div className=" h-[45%] flex gap-3">
						<div className="">
							<Image
								src={(imagesData && imagesData[2].heroSliderImg) || defaultImg}
								alt="img"
								width={100}
								height={100}
								className=" w-full h-full rounded-[20px] "
							/>
						</div>
						<div className=" h-[80%] self-end">
							<Image
								src={(imagesData && imagesData[3].heroSliderImg) || defaultImg}
								alt="img"
								width={100}
								height={100}
								className=" w-full h-full rounded-[20px] "
							/>
						</div>
						<div className="">
							<Image
								src={(imagesData && imagesData[4].heroSliderImg) || defaultImg}
								alt="img"
								width={100}
								height={100}
								className=" w-full h-full rounded-[20px] "
							/>
						</div>
					</div>
				</div>
				<div className=" flex flex-col justify-end gap-3">
					<div className=" h-[50%]">
						<Image
							src={(imagesData && imagesData[5].heroSliderImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full rounded-[20px] "
						/>
					</div>
					<div className=" h-[30%]">
						<Image
							src={(imagesData && imagesData[6].heroSliderImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full rounded-[20px] "
						/>
					</div>
				</div>
			</div>
			<div className="md:hidden flex flex-col justify-end gap-10 h-full">
				<div className=" px-4 flex flex-col gap-4">
					<h1 className=" text-3xl leading-8 text-[#171717] font-bold text-center ">
						{currentHeroData?.heading}
					</h1>
					<p className="text-base leading-6 font-normal text-center">
						{currentHeroData?.description}
					</p>
					<div className=" flex flex-wrap gap-4 justify-center">
						<Button title="Donate a Share" className=" bg-[#CF7475]" />
						<Button title="Become a Sponser" className=" bg-[#8DAE8E]" />
						<Button title="Register as Family" className=" bg-[#000000]" />
					</div>
				</div>
				<div className="carousel-container h-[40%]">
					<div className="carousel h-full">
						{imagesData?.map((item: any, i: number) => (
							<div
								key={i}
								className="carousel-item flex even:items-end odd:items-start px-2"
							>
								<Image
									src={(imagesData && item?.heroSliderImg) || defaultImg}
									alt="img"
									width={100}
									height={100}
									className=" w-full h-[90%] rounded-[20px] "
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
