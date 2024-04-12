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

const FamilyCard: React.FC<{ familyData?: any; isLoggedIn?: boolean }> = ({
	familyData,
	isLoggedIn,
}) => {
	const t = useTranslations('AddFamilies.form');
	const { user } = useLoggedInUser();
	const [amount, setAmount] = useState<number>(0);
	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef(null);
	const [donateOpen, setDonateOpen] = useState(false);
	const cancelDonateButtonRef = useRef(null);

	const [currentFamilyInfo, setCurrentFamilyInfo] = useState<any>(null);


	return (
		<>
			<div className=" bg-[#F8F8F8] rounded-[20px] px-6 py-6 w-full max-w-[400px] flex flex-1 flex-col justify-between gap-4">
				{/* first div */}
				<div className=" flex justify-between items-center">
					<Button
						title={familyData?.currentSituation || 'Nil'}
						className=" bg-[#CF7475]"
					/>
				</div>

				{/* second div */}
				<div className=" flex flex-col gap-3">
					<h2 className="  text-2xl font-semibold">
					{
						familyData?.breadWinnerName
						? familyData?.breadWinnerName?.inEnglish
						: 'Unknown'
					}
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
					<div className=" flex flex-col gap-2">
						<div className=" flex gap-2">
							<span className=" text-base font-semibold">
								{t('losesinwar.title')}:
							</span>
							<span className=" text-base font-normal">
								{familyData?.lossesInWar}
							</span>
						</div>
						<div className=" flex gap-2">
							<span className=" text-base font-semibold">
								{t('MartyrInFamily.title')}:
							</span>
							<span className=" text-base font-normal">
								{familyData?.numberOfMartyrInFamily}
							</span>
						</div>
						<div className=" flex gap-2">
							<span className=" text-base font-semibold">
								{t('InfectedInFamily.title')}:
							</span>
							<span className=" text-base font-normal">
								{familyData?.numberOfInfectedInFamily}
							</span>
						</div>
					</div>
				</div>

				{/* content div */}

				{/* <div className=" text-base font-light">
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
						molestias, debitis veniam, suscipit dolor ex beatae libero omnis
						delectus autem, amet minima? Delectus magni atque soluta
						exercitationem modi, fugit doloremque!
					</p>
				</div> */}

				{/* buttons */}
				<div className=" flex gap-2">
					<Button
						onClick={() => {
							setOpen(true);
							setCurrentFamilyInfo(familyData);
						}}
						title={`${user ? `Sponser` : `Donate a share`}`}
						className=" bg-[#8DAE8E]"
					/>
					<Button title="Add to Basket" className=" bg-[#000000]" />
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
