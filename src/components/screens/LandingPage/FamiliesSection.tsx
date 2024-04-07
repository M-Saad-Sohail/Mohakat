import React from 'react';
import FamilyCard from '@/components/ui/FamilyCard';
import useLoggedInUser from '@/hooks/useLoggedInUser';

const FamiliesSection = () => {
	const { user, isLoading } = useLoggedInUser();
	return (
		<>
			<section className=" md:w-[80%] w-[90%] mx-auto flex flex-col gap-8 py-12">
				<div className=" flex justify-between">
					<h2 className=" md:text-3xl text-2xl font-semibold">Families</h2>
					<span className=" md:text-lg text-base font-light">see more</span>
				</div>

				<div className=" grid md:grid-cols-3 grid-cols-1 gap-4">
					<FamilyCard isLoggedIn={!isLoading && !!user} />
					<FamilyCard isLoggedIn={!isLoading && !!user} />
					<FamilyCard isLoggedIn={!isLoading && !!user} />
				</div>
			</section>
		</>
	);
};

export default FamiliesSection;
