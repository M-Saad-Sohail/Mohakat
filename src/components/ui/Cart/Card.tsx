import React, { useEffect, useState } from 'react';

import PeopleSvg from '@/assests/icons/people.svg';
import LocationSvg from '@/assests/icons/location.svg';
import CalenderSvg from '@/assests/icons/calendar-icon.svg';
import Image from 'next/image';
import Button from '../LandingPage/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setIsRemoveCartStateAction } from '@/state/cart';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { calculateAmount } from '@/utils/calculateAmount';

const FamilyCard = ({ family }: { family: any }) => {
	const { user } = useLoggedInUser();
	const dispatch = useDispatch();
	const currencyState = useSelector((state: any) => state.currency);

	return (
		<div className="flex flex-col gap-[10px] justify-between bg-[#F8F8F8] rounded-xl p-4 shadow-md">
			<div className=" flex justify-between">
				<h3 className="text-sm font-semibold">{family?.breadWinnerName}</h3>
				<h3 className="text-sm font-semibold">
					{currencyState.key}{' '}
					{calculateAmount(
						'3',
						family?.numberOfFamilyMembers,
						currencyState?.basePriceOne,
						currencyState?.basePriceTwo,
					)}
				</h3>
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
				className=" md:py-2 md:text-xs w-fit"
				Color="#CF7475"
				onClick={() =>
					dispatch(setIsRemoveCartStateAction({ id: family?._id }))
				}
			/>
		</div>
	);
};

export default FamilyCard;
