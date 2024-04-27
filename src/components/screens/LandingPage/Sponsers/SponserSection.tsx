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
		<section
			dir={dir}
			className=" md:w-[80%] w-[90%] flex flex-col md:gap-16 gap-12 pt-6 pb-14 mx-auto"
		>
			<div className=" flex flex-col gap-4">
				<SponserMain currentPath={currentPath} />
				{!user && (
					<div className=" flex md:flex-nowrap flex-wrap gap-4">
						<Link href={url(PATHS.BECOME_SPONSOR)}>
							<Button title={t('BecomeaSponser.title')} Color="#8DAE8E" />
						</Link>
					</div>
				)}
			</div>
			<div
				className={`flex md:flex-row flex-col justify-between ${currentPath === 'ar' ? ' md:gap-9' : 'md:gap-4'} gap-6`}
			>
				{featureData?.map((item: any, i: number) => (
					<div
						key={i}
						className="flex-1 flex flex-col items-center gap-5 feature-shadow"
					>
						<Image
							src={`/svgs/landing-sponser/sponser-svg-${i + 1}.svg`}
							alt={`img`}
							width={100}
							height={100}
							className=" h-auto md:w-auto w-[70px]"
						/>
						<h2 className="text-2xl font-bold">
							{t('Step.title')} {i + 1}
						</h2>{' '}
						<p className="md:text-lg text-base font-light text-center">
							{item.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default SponserSection;
