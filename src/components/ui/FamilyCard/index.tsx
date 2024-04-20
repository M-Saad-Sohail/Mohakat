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
import Link from 'next/link';
import { PATHS } from '@/contants';

const FamilyCard: React.FC<{ familyData?: any; isLoggedIn?: boolean }> = ({
	familyData,
	isLoggedIn,
}) => {
	const { user } = useLoggedInUser();
	const dispatch = useDispatch();
	const t = useTranslations('AddFamilies.form');
	const t1 = useTranslations('HeroMainSection.btns');
	const cancelButtonRef = useRef(null);
	const cancelDonateButtonRef = useRef(null);
	const cartItems = useSelector((state: any) => state.cart);
	const currencyState = useSelector((state: any) => state.currency);
	const [amount, setAmount] = useState<number>(0);
	const [open, setOpen] = useState(false);
	const [currentFamilyInfo, setCurrentFamilyInfo] = useState<any>(null);
	const [donateOpen, setDonateOpen] = useState(false);
	const { url, dir, locale, changeLocale } = useLocaleRouter();

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
						Color="#CF7475"
					/>
					<p className=" flex gap-1 text-lg font-semibold">
						{familyData.numberOfFamilyMembers >= 3 ? (
							<>
								<span>{currencyState?.key}</span>
								<span>{currencyState?.basePriceTwo}</span>
							</>
						) : (
							<>
								<span>{currencyState?.key}</span>
								<span>{currencyState?.basePriceOne}</span>
							</>
						)}
					</p>
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
				<div className=" flex justify-between gap-2">
					<Button
						onClick={() => {
							setOpen(true);
							setCurrentFamilyInfo(familyData);
						}}
						title={`${user ? t1('Sponser.title') : t1('DonateaShare.title')}`}
						className="md:px-0 md:py-2 w-full"
						Color={`${user ? '#8DAE8E' : '#CF7475'}`}
					/>
					{!user ? (
						<Link href={url(PATHS.BECOME_SPONSOR)} className=" w-full">
							<Button
								title={t1('BecomeaSponser.title')}
								Color="#8DAE8E"
								className=" md:px-1 md:py-2 w-full"
							/>
						</Link>
					) : isInCart ? (
						<Button
							title={t1('AlreadyAdded.title')}
							className="md:px-1 md:py-2 w-full"
							Color="#555555"
						/>
					) : (
						<Button
							title={t1('AddtoBasket.title')}
							className="md:px-1 md:py-2 w-full"
							Color="#000000"
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
