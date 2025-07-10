import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImg from '@/assests/images/landing-page/light-gray-background.png';
import { getJson } from '@/api/api.instances';
import Link from 'next/link';
import Button from '@/components/ui/LandingPage/Button';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLandingStateAction } from '@/state/landingpage';
import { RootState } from '@/state/store';
import { usePathname } from 'next/navigation';
import IntiationMain from './IntiationMain';

const ImagesSection = () => {
	const dispatch = useDispatch();
	const pathname = usePathname();
	const currentPath = pathname?.slice(1);
	const t = useTranslations('HeroMainSection.btns');
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const [imagesData, setImagesData] = useState<any>();

	// const fetchLandingImages = async () => {
	// 	const res = await getJson(
	// 		`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-landing-img`,
	// 	);
	// 	if (res.success) {
	// 		setImagesData(res.landingPageSlider);
	// 		dispatch(
	// 			setIsLandingStateAction({
	// 				key: 'landingPageSlider',
	// 				value: res.landingPageSlider,
	// 			}),
	// 		);
	// 	}
	// };

	// useEffect(() => {
	// 	try {
	// 		if (data.landingPageSlider) {
	// 			setImagesData(data.landingPageSlider);
	// 		} else {
	// 			fetchLandingImages();
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, []);

	return (
		<section className = "">
		<div
			dir={dir}
			className=" md:w-[80%] w-[90%] flex flex-col md:gap-16 gap-12 md:my-12 mt-6 mb-12 mx-auto"
		>
			<div className=" flex flex-col gap-4">
				<IntiationMain currentPath={currentPath} />
				{/* <div className=" flex md:flex-nowrap flex-wrap gap-4">
					<Link href={url(PATHS.FAMILY)}>
						<Button title={t('DonateaShare.title')} Color="#CF7475" />
					</Link>
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
			</div>
			<div className="flex md:gap-4 gap-2 md:h-[90vh] h-[320px]">
				<div className=" flex-1 grid grid-rows-5 md:gap-4 gap-2 h-full">
					<div className=" row-span-2">
						<Image
							src={(imagesData && imagesData[0].landingPageImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
						/>
					</div>
					<div className=" row-span-3">
						<Image
							src={(imagesData && imagesData[1].landingPageImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover "
						/>
					</div>
				</div>
				<div className=" flex-1 grid grid-rows-5 md:gap-4 gap-2 h-full">
					<div className=" row-span-3">
						<Image
							src={(imagesData && imagesData[2].landingPageImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover "
						/>
					</div>
					<div className=" row-span-2">
						<Image
							src={(imagesData && imagesData[3].landingPageImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
						/>
					</div>
				</div>
				<div className=" flex-1 grid grid-rows-7 md:gap-4 gap-2 h-full">
					<div className=" row-span-2">
						<Image
							src={(imagesData && imagesData[4].landingPageImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
						/>
					</div>
					<div className=" row-span-3">
						<Image
							src={(imagesData && imagesData[5].landingPageImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
						/>
					</div>
					<div className=" row-span-2">
						<Image
							src={(imagesData && imagesData[6].landingPageImg) || defaultImg}
							alt="img"
							width={100}
							height={100}
							className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
						/>
					</div>
				</div> */}
			</div>
		</div>
		</section>
	);
};

export default ImagesSection;
