'use client';
import React, { useEffect, useState, useRef } from 'react';
import Button from '@/components/ui/LandingPage/Button';
import { usePathname } from 'next/navigation';
import { getJson } from '@/api/api.instances';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { toast } from 'react-toastify';
import { PATHS } from '@/contants';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLandingStateAction } from '@/state/landingpage';
import { RootState } from '@/state/store';
import QuickDonationModal from '@/components/ui/Modals/QuickDonationModal';
import { getUserFromLocalStorage } from '@/utils/auth';

interface HeroDataType {
	heading: string;
	description: string;
}

const HeroSection: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const user = getUserFromLocalStorage();
	const currentPath = pathname?.slice(1);
	const [imagesData, setImagesData] = useState<any>();
	const t = useTranslations('HeroMainSection.btns');
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const [currentHeroData, setCurrentHeroData] = useState<HeroDataType>({
		heading: '',
		description: '',
	});

	const [quickDonationOpen, setQuickDonationOpen] = useState(false);
	const cancelQuickDonationButtonRef = useRef(null);

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

	const fetchHeroData = async () => {
		const res = await getJson(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-hero`,
		);
		if (res.success) {
			handleHeroData(currentPath, res.newHero[0]);
			dispatch(
				setIsLandingStateAction({
					key: 'newHero',
					value: res.newHero[0],
				}),
			);
		}
	};

	const fetchHeroImages = async () => {
		const res = await getJson(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-hero-img`,
		);
		if (res.success) {
			setImagesData(res.heroSlider);
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
			if (data.newHero) {
				handleHeroData(currentPath, data.newHero);
			} else {
				fetchHeroData();
			}
			if (data.heroSlider) {
				setImagesData(data.heroSlider);
			} else {
				fetchHeroImages();
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<section className="md:w-[80%] w-full h-[85vh] flex items-center mx-auto">
			<QuickDonationModal
				open={quickDonationOpen}
				setOpen={setQuickDonationOpen}
				cancelButtonRef={cancelQuickDonationButtonRef}
			/>
			<div className=" hidden md:grid grid-cols-5 h-[90%] gap-3 animated-div">
				<div className=" flex flex-col justify-end gap-3">
					<div className=" h-[50%] feature-shadow">
						<img
							src={
								(imagesData && imagesData[0].heroSliderImg) ||
								'/images/light-gray-background.png'
							}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full rounded-[20px] object-cover"
						/>
					</div>
					<div className=" h-[30%] feature-shadow">
						<img
							src={
								(imagesData && imagesData[1].heroSliderImg) ||
								'/images/light-gray-background.png'
							}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full rounded-[20px] object-cover"
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
					{!user && (
						<div
							className={` flex flex-wrap justify-center mx-auto ${currentPath === 'ar' ? 'gap-5' : 'gap-4'}`}
						>
							<Button
								title={t('DonateaShare.title')}
								Color="#CF7475"
								onClick={() => {
									setQuickDonationOpen(true);
								}}
							/>
							<Link href={url(PATHS.BECOME_SPONSOR)}>
								<Button title={t('BecomeaSponser.title')} Color="#8DAE8E" />
							</Link>
							<Button
								onClick={() => {
									toast.error(`This feature is in progress`, {
										toastId: 'success',
										position: 'bottom-right',
										autoClose: 4000,
									});
								}}
								title={t('RegisterasFamily.title')}
								Color="#000000"
							/>
						</div>
					)}
					<div className=" h-[45%] flex gap-3">
						<div className=" flex-1 feature-shadow">
							<img
								src={
									(imagesData && imagesData[2].heroSliderImg) ||
									'/images/light-gray-background.png'
								}
								alt="img"
								width={100}
								height={100}
								className=" w-full h-full rounded-[20px] object-cover"
							/>
						</div>
						<div className=" flex-1 h-[80%] self-end feature-shadow">
							<img
								src={
									(imagesData && imagesData[3].heroSliderImg) ||
									'/images/light-gray-background.png'
								}
								alt="img"
								width={100}
								height={100}
								className=" w-full h-full rounded-[20px] object-cover"
							/>
						</div>
						<div className="flex-1 feature-shadow">
							<img
								src={
									(imagesData && imagesData[4].heroSliderImg) ||
									'/images/light-gray-background.png'
								}
								alt="img"
								width={100}
								height={100}
								className=" w-full h-full rounded-[20px] object-cover"
							/>
						</div>
					</div>
				</div>
				<div className=" flex flex-col justify-end gap-3 ">
					<div className=" h-[50%] feature-shadow">
						<img
							src={
								(imagesData && imagesData[5].heroSliderImg) ||
								'/images/light-gray-background.png'
							}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full rounded-[20px] object-cover"
						/>
					</div>
					<div className=" h-[30%] feature-shadow">
						<img
							src={
								(imagesData && imagesData[6].heroSliderImg) ||
								'/images/light-gray-background.png'
							}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full rounded-[20px] object-cover"
						/>
					</div>
				</div>
			</div>
			<div
				className={`md:hidden flex flex-col ${user ? 'justify-center gap-12' : 'justify-end gap-10'}  h-full`}
			>
				<div className=" px-4 flex flex-col gap-4">
					<h1
						className={` text-3xl ${user ? 'leading-10' : 'leading-8'}  text-[#171717] font-bold text-center `}
					>
						{currentHeroData?.heading}
					</h1>
					<p
						className={`text-base leading-6 font-normal text-center ${user && 'mt-2'}`}
					>
						{currentHeroData?.description}
					</p>
					{!user && (
						<div className=" flex flex-wrap gap-4 justify-center">
							<Button
								title={t('DonateaShare.title')}
								Color="#CF7475"
								onClick={() => {
									setQuickDonationOpen(true);
								}}
							/>
							<Link href={url(PATHS.BECOME_SPONSOR)}>
								<Button title={t('BecomeaSponser.title')} Color="#8DAE8E" />
							</Link>
							<Button
								onClick={() => {
									toast.error(`This feature is in progress`, {
										toastId: 'success',
										position: 'top-center',
										autoClose: 4000,
									});
								}}
								title={t('RegisterasFamily.title')}
								Color="#000000"
							/>
						</div>
					)}
				</div>
				<div className="carousel-container h-[40%]">
					<div className="carousel h-full">
						{imagesData?.map((item: any, i: number) => (
							<div
								key={i}
								className="carousel-item flex even:items-end odd:items-start px-2"
							>
								<img
									src={
										(imagesData && item?.heroSliderImg) ||
										'/images/light-gray-background.png'
									}
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
