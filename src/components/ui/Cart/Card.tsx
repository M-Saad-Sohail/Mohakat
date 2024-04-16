import React from 'react';

import PeopleSvg from '@/assests/icons/people.svg';
import LocationSvg from '@/assests/icons/location.svg';
import CalenderSvg from '@/assests/icons/calendar-icon.svg';
import Image from 'next/image';
import Button from '../LandingPage/Button';
import { useDispatch } from 'react-redux';
import { setIsRemoveCartStateAction } from '@/state/cart';
import useLoggedInUser from '@/hooks/useLoggedInUser';

const FamilyCard = ({ family }: { family: any }) => {
	const dispatch = useDispatch();
	const { user } = useLoggedInUser();
	return (
		<div className="flex flex-col gap-[10px] justify-between bg-[#F8F8F8] rounded-xl p-4 shadow-md">
			<div className=" flex justify-between">
				<h3 className="text-sm font-semibold">
					{family?.breadWinnerName}
				</h3>
				<h3 className="text-sm font-semibold">$300</h3>
			</div>
			<div className="flex items-center gap-2">
				<div className=" flex items-center gap-2">
					<Image src={PeopleSvg} alt="people" className=" w-4" />
					<span className=" text-xs font-normal">
						{family?.numberOfFamilyMembers}
					</span>
				</div>
				<div className=" flex items-center gap-2">
					<Image src={LocationSvg} alt="people" className=" w-4" />
					<span className=" text-xs font-normal">
						{family?.areaOfCurrentResidence}
					</span>
				</div>
				{user && (
					<div className=" flex items-center gap-2">
						<Image src={CalenderSvg} alt="people" className=" w-4" />
						<span className=" text-xs font-normal">3 Month(s)</span>
					</div>
				)}
			</div>
			<Button
				title="Remove"
				className=" bg-[#CF7475] md:py-2 md:text-xs w-fit"
				onClick={() =>
					dispatch(setIsRemoveCartStateAction({ id: family?._id }))
				}
			/>
		</div>
	);
};

export default FamilyCard;
