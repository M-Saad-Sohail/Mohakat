import FamilyCard from '@/components/ui/FamilyCard';
import React from 'react';

const FamiliesSection = () => {
	return (
		<>
			<section className=" w-[80%] mx-auto flex flex-col gap-3 py-12">
				<div className=" flex justify-between">
					<h2 className=" text-3xl font-semibold">Families</h2>
					<span className=" text-lg font-medium">see more</span>
				</div>

				<div className=" grid grid-cols-3 gap-4">
					<FamilyCard />
					<FamilyCard />
					<FamilyCard />
				</div>
			</section>
		</>
	);
};

export default FamiliesSection;
