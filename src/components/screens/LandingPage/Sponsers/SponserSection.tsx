import Button from '@/components/ui/LandingPage/Button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getJson } from '@/api/api.instances';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { toast } from 'react-toastify';
import { PATHS } from '@/contants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setIsLandingStateAction } from '@/state/landingpage';
import SponserMain from './SponserMain';
import { getUserFromLocalStorage } from '@/utils/auth';
import {
	MdOutlinePayments as Feature_1,
	MdOutlineFamilyRestroom as Feature_2,
	MdMobileFriendly as Feature_3,
} from 'react-icons/md';

const SponserSection: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1);
	const user = getUserFromLocalStorage();
	const [featureData, setFeatureData] = useState<any[]>([]);
	const t = useTranslations('HeroMainSection.btns');
	const { url, dir, locale, changeLocale } = useLocaleRouter();

	const handleFeatureData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setFeatureData((prev: any) => [
				...prev,
				{
					description: data?.description?.inEnglish,
				},
			]);
		} else if (path === 'ar') {
			setFeatureData((prev: any) => [
				...prev,
				{ description: data?.description?.inArabic },
			]);
		} else if (path === 'tr') {
			setFeatureData((prev: any) => [
				...prev,
				{ description: data?.description?.inTurkish },
			]);
		}
	};

	const fetchFeature = () => {
		(async () => {
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-feature`,
			);
			if (res.success) {
				setFeatureData([]);
				res.feature.map((item: any) => handleFeatureData(currentPath, item));
				dispatch(
					setIsLandingStateAction({
						key: 'feature',
						value: res.feature,
					}),
				);
			}
		})();
	};

	useEffect(() => {
		if (data.feature) {
			setFeatureData([]);
			data.feature.map((item: any) => handleFeatureData(currentPath, item));
		} else {
			fetchFeature();
		}
	}, []);

	return (
		<section className=" w-full h-full">
			<div
				dir={dir}
				className=" md:w-[80%] w-[90%] flex flex-col md:gap-16 gap-12 pt-6 pb-14 mx-auto animated-div "
			>
				<div className="flex flex-col gap-4 ">
					<SponserMain currentPath={currentPath} />
				</div>
				<div
					className={`flex md:flex-row flex-col justify-between ${currentPath === 'ar' ? ' md:gap-9' : 'md:gap-4'} gap-6`}
				>
					{featureData?.map((item: any, i: number) => (
						<div
							key={i}
							className="relative bg-[#75846a] text-white p-8 flex-1 flex flex-col items-center gap-5 rounded-[15px] transition-all duration-500 ease-out transform-gpu hover:scale-[1.07] cursor-pointer"
						>
							<div className=" absolute top-0 bg-herosection w-full h-full opacity-20"></div>
							{i === 0 && (
								<span>
									<Feature_3 className=" text-8xl h-auto md:w-auto w-[70px]" />
								</span>
							)}
							{i === 1 && (
								<span>
									<Feature_2 className=" text-8xl h-auto md:w-auto w-[70px]" />
								</span>
							)}
							{i === 2 && (
								<span>
									<Feature_1 className=" text-8xl h-auto md:w-auto w-[70px]" />
								</span>
							)}
							<h2 className="text-3xl font-bold">
								{t('Step.title')} {i + 1}
							</h2>{' '}
							<p className="md:text-lg text-base font-light text-center">
								{item.description}
							</p>
						</div>
					))}
				</div>
				{!user && (
					<div className="flex md:flex-nowrap flex-wrap gap-4 justify-center">
						<Link href={url(PATHS.BECOME_SPONSOR)}>
							<Button title={t('BecomeaSponser.title')} Color="#8DAE8E" />
						</Link>
					</div>
				)}
			</div>
		</section>
	);
};

export default SponserSection;
