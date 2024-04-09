import Button from '@/components/ui/LandingPage/Button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getJson } from '@/api/api.instances';
import { usePathname } from 'next/navigation';

interface SponserDataType {
	heading: string;
	description: string;
}

const SponserSection: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
	const pathname = usePathname();
	const currentPath = pathname?.slice(1);
	const [featureData, setFeatureData] = useState<any[]>([]);
	const [sponserData, setSponserData] = useState<SponserDataType>({
		heading: '',
		description: '',
	});
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

	useEffect(() => {
		(async () => {
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-feature`,
			);
			if (res.success) {
				setFeatureData([]);
				res.feature.map((item: any) => handleFeatureData(currentPath, item));
			}
		})();
	}, []);

	const handleSponserData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setSponserData({
				heading: data?.heading?.inEnglish,
				description: data?.description?.inEnglish,
			});
		} else if (path === 'ar') {
			setSponserData({
				heading: data?.heading?.inArabic,
				description: data?.description?.inArabic,
			});
		} else if (path === 'tr') {
			setSponserData({
				heading: data?.heading?.inTurkish,
				description: data?.description?.inTurkish,
			});
		}
	};

	useEffect(() => {
		(async () => {
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-action`,
			);
			if (res.success) {
				handleSponserData(currentPath, res.newPost[0]);
			}
		})();
	}, []);

	return (
		<section className=" md:w-[80%] w-[90%] flex flex-col md:gap-20 gap-12 py-14 mx-auto">
			<div className=" flex flex-col gap-4">
				<h2 className=" md:text-3xl text-2xl font-semibold">
					{sponserData?.heading}
				</h2>
				<p className=" md:text-lg text-base font-light">
					{sponserData?.description}
				</p>
				<div className=" flex md:flex-nowrap flex-wrap gap-4">
					<Button title="Donate a Share" className=" bg-[#CF7475]" />
					<Button title="Become a Sponser" className=" bg-[#8DAE8E]" />
					<Button title="Register as Family" className=" bg-[#000000]" />
				</div>
			</div>
			<div className=" flex md:flex-row flex-col justify-between md:gap-0 gap-6">
				{featureData?.map((item: any, i: number) => (
					<div key={i} className=" flex-1 flex flex-col items-center gap-5">
						<Image
							src={`/svgs/landing-sponser/sponser-svg-${i + 1}.svg`}
							alt={`img`}
							width={100}
							height={100}
							className=" h-auto md:w-auto w-[70px]"
						/>
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
