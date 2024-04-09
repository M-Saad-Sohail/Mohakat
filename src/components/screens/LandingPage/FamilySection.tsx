import React, { useEffect, useState } from 'react';
import FamilyCard from '@/components/ui/FamilyCard';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { getJson } from '@/api/api.instances';
import Loader from '@/components/ui/Loader';

const FamilySection: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [familiesData, setFamiliesData] = useState<any[]>([]);
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/random-families`,
			);
			if (res.success) {
				localStorage.setItem('randomFamilies', res.randomFamilies);
				console.log(res.randomFamilies);
				setFamiliesData(res.randomFamilies);
				setIsLoading(false);
			}
		})();
	}, []);
	return (
		<>
			<section className=" md:w-[80%] w-[90%] mx-auto flex flex-col gap-8 py-12">
				<div className=" flex justify-between">
					<h2 className=" md:text-3xl text-2xl font-semibold">Families</h2>
					<span className=" md:text-lg text-base font-light">see more</span>
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
