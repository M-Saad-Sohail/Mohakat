import React from 'react';

import PeopleSvg from '@/assests/icons/people.svg';
import LocationSvg from '@/assests/icons/location.svg';
import Image from 'next/image';
import Button from '../LandingPage/Button';

const FamilyCard = () => {
	return (
		<div className="flex flex-col gap-[10px] justify-between bg-[#F8F8F8] rounded-xl p-4 shadow-md">
			<div className=" flex justify-between">
				<h3 className="text-sm font-semibold">Family Name</h3>
				<h3 className="text-sm font-semibold">$300</h3>
			</div>
			<div className="flex items-center gap-2">
				<div className=" flex items-center gap-2">
					<Image src={PeopleSvg} alt="people" className=" w-4" />
					<span className=" text-xs font-normal">04</span>
				</div>
				<div className=" flex items-center gap-2">
					<Image src={LocationSvg} alt="people" className=" w-4" />
					<span className=" text-xs font-normal">Rafah</span>
				</div>
			</div>
			<Button
				title="Remove"
				className=" bg-[#CF7475] md:py-2 md:text-xs w-fit"
			/>
		</div>
	);
};

export default FamilyCard;
