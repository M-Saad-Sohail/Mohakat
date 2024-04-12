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

const ImagesSection = () => {
	const [imagesData, setImagesData] = useState<any>();
	const t = useTranslations('HeroMainSection.btns');
	const { url, dir, locale, changeLocale } = useLocaleRouter();

	useEffect(() => {
		(async () => {
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-landing-img`,
			);
			if (res.success) {
				setImagesData(res.landingPageSlider);
			}
		})();
	}, []);

	return (
		<section className=" md:w-[80%] w-[90%] flex flex-col md:gap-16 gap-12 md:my-12 mt-6 mb-12 mx-auto">
			<div className=" flex flex-col gap-4">
				<h2 className=" md:text-3xl text-2xl font-semibold">
					What they say about the initiation?
				</h2>
				<p className=" md:text-lg text-base font-light">
					Lorem ipsum dolor sit amet consectetur. Faucibus turpis sed nisl in.
					Lacus mi vel arcu sed lacus sed lacus. Erat convallis sed suscipit
					tortor urna bibendum vivamus sit. Morbi proin commodo imperdiet
					ullamcorper quam cum elit.
				</p>
				<div className=" flex md:flex-nowrap flex-wrap gap-4">
					<Link href={url(PATHS.FAMILY)}>
						<Button title={t('DonateaShare.title')} className=" bg-[#CF7475]" />
					</Link>
					<Link href={url(PATHS.BECOME_SPONSOR)}>
						<Button
							title={t('BecomeaSponser.title')}
							className=" bg-[#8DAE8E]"
						/>
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
						className=" bg-[#000000]"
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
				</div>
			</div>
		</section>
	);
};

export default ImagesSection;
