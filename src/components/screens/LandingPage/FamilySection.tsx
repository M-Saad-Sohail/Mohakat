import React, { useEffect, useState } from 'react';
import FamilyCard from '@/components/ui/FamilyCard';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { getJson } from '@/api/api.instances';
import Loader from '@/components/ui/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setIsLandingStateAction } from '@/state/landingpage';
import Link from 'next/link';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';

const FamilySection: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [familiesData, setFamiliesData] = useState<any[]>([]);

	const fetchRandomFamilies = async () => {
		setIsLoading(true);
		const res = await getJson(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/random-families`,
		);
		if (res.success) {
			setFamiliesData(res.randomFamilies);
			dispatch(
				setIsLandingStateAction({
					key: 'randomFamilies',
					value: res.randomFamilies,
				}),
			);
		}
	};

	useEffect(() => {
		if (data.randomFamilies) {
			setFamiliesData(data.randomFamilies);
		} else {
			fetchRandomFamilies();
		}
	}, []);
	return (
		<>
			<section className=" md:w-[80%] w-[90%] mx-auto flex flex-col gap-8 py-12">
				<div className=" flex justify-between">
					<h2 className=" md:text-3xl text-2xl font-semibold">Families</h2>
					<Link href={url(PATHS.FAMILY)} locale={locale}>
						<span className=" md:text-lg text-base font-light">see more...</span>
					</Link>
				</div>
				{isLoading ? (
					<div className=" flex justify-center items-center h-32">
						<Loader />
					</div>
				) : familiesData && familiesData.length > 0 ? (
					<div className=" grid md:grid-cols-3 grid-cols-1 gap-4">
						{familiesData.map((family, i) => (
							<FamilyCard key={i} familyData={family} isLoggedIn={isLoggedIn} />
						))}
					</div>
				) : (
					<div className=" flex justify-center items-center h-32">
						<h2 className=" text-center md:text-3xl text-2xl font-semibold">
							Families Not Found
						</h2>
					</div>
				)}
			</section>
		</>
	);
};

export default FamilySection;
