'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/LandingPage/Button';
// ICONS
import PeopleSvg from '@/assests/icons/people.svg';
import LocationSvg from '@/assests/icons/location.svg';
import FamilyModal from '../Modals/FamilyModal';
import DonateModal from '../Modals/DonateModal';
import { useTranslations } from 'next-intl';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddCartStateAction } from '@/state/cart';
import useLocaleRouter from '@/hooks/useLocaleRouter';

const FamilyCard: React.FC<{ familyData?: any; isLoggedIn?: boolean }> = ({
	familyData,
	isLoggedIn,
}) => {
	const dispatch = useDispatch();
	const t = useTranslations('AddFamilies.form');
	const { user } = useLoggedInUser();
	const [amount, setAmount] = useState<number>(0);
	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef(null);
	const [donateOpen, setDonateOpen] = useState(false);
	const cancelDonateButtonRef = useRef(null);
	const { url, dir, locale, changeLocale } = useLocaleRouter();

	const [currentFamilyInfo, setCurrentFamilyInfo] = useState<any>(null);

	// Get cart items from Redux store
	const cartItems = useSelector((state: any) => state.cart);

	// Check if familyData is already in the cart
	const isInCart = cartItems.some((item: any) => item._id === familyData?._id);

	return (
		<>
			<div
				dir={dir}
				className=" bg-[#F8F8F8] rounded-[20px] px-6 py-6 w-full max-w-[400px] flex flex-1 flex-col justify-between gap-4 shadow-md"
			>
				{/* first div */}
				<div className=" flex justify-between items-center">
					<Button
						title={familyData?.currentSituation || 'Nil'}
						className=" bg-[#CF7475]"
					/>
					<span className=" text-lg font-semibold">
						{familyData.numberOfFamilyMembers >= 3 ? '$500' : '$300'}
					</span>
				</div>

				{/* second div */}
				<div className=" flex flex-col gap-3">
					<h2 className="  text-2xl font-semibold">
						{familyData?.breadWinnerName
							? familyData?.breadWinnerName
							: 'Unknown'}
					</h2>
					{/* people and location div */}
					<div className=" flex gap-8">
						<div className=" flex gap-2 justify-center items-center">
							<Image src={PeopleSvg} alt="people" />
							<span className=" text-base font-normal">
								{familyData?.numberOfFamilyMembers}
							</span>
						</div>

						<div className=" flex gap-2 justify-center items-center">
							<Image src={LocationSvg} alt="people" />
							<span className=" text-base font-normal">
								{familyData?.areaOfCurrentResidence}
							</span>
						</div>
					</div>
				</div>

				{/* content div */}

				<div className=" text-[15px] font-light">
					<p>{familyData?.description}</p>
				</div>

				{/* buttons */}
				<div className=" flex justify-between">
					<Button
						onClick={() => {
							setOpen(true);
							setCurrentFamilyInfo(familyData);
						}}
						title={`${user ? `Sponser` : `Donate a share`}`}
						className=" bg-[#8DAE8E] md:px-5"
					/>
					{isInCart ? (
						<Button title="Already Added" className=" bg-[#555555] md:px-5" />
					) : (
						<Button
							title="Add to Basket"
							className=" bg-[#000000] md:px-5"
							onClick={() => dispatch(setIsAddCartStateAction(familyData))}
						/>
					)}
				</div>
			</div>
			<FamilyModal
				setOpen={setOpen}
				open={open}
				setDonate={setDonateOpen}
				cancelButtonRef={cancelButtonRef}
				isLoggedIn={isLoggedIn}
				familyInfo={currentFamilyInfo}
				amount={amount}
				setAmount={setAmount}
			/>
			<DonateModal
				setOpen={setDonateOpen}
				open={donateOpen}
				cancelButtonRef={cancelDonateButtonRef}
				isLoggedIn={isLoggedIn}
				amount={amount}
				setAmount={setAmount}
			/>
		</>
	);
};

export default FamilyCard;
