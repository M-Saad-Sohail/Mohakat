'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/LandingPage/Button';
// ICONS
import PeopleSvg from '@/assests/icons/people.svg';
import LocationSvg from '@/assests/icons/location.svg';
import FamilyModal from '../Modals/FamilyModal';
import DonateModal from '../Modals/DonateModal';

const FamilyCard: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef(null);
	const [donateOpen, setDonateOpen] = useState(false);
	const cancelDonateButtonRef = useRef(null);
	return (
		<>
			<div className=" bg-[#F8F8F8] rounded-[20px] px-6 py-6 w-full max-w-[400px] flex flex-1 flex-col gap-4">
				{/* first div */}
				<div className=" flex justify-between items-center">
					<Button title="Very Bad" className=" bg-[#CF7475]" />
					<span className=" text-xl font-bold">$300</span>
				</div>

				{/* second div */}
				<div className=" flex flex-col gap-2">
					<h2 className="  text-2xl font-semibold">Family Name</h2>
					{/* people and location div */}
					<div className=" flex gap-8">
						<div className=" flex gap-2 justify-center items-center">
							<Image src={PeopleSvg} alt="people" />
							<span className=" text-base font-normal">03</span>
						</div>

						<div className=" flex gap-2 justify-center items-center">
							<Image src={LocationSvg} alt="people" />
							<span className=" text-base font-normal">Rafah</span>
						</div>
					</div>
				</div>

				{/* content div */}

				<div className=" text-base font-light">
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
						molestias, debitis veniam, suscipit dolor ex beatae libero omnis
						delectus autem, amet minima? Delectus magni atque soluta
						exercitationem modi, fugit doloremque!
					</p>
				</div>

				{/* buttons */}
				<div className=" flex gap-2">
					<Button
						onClick={() => {
							setOpen(true);
						}}
						title={`${isLoggedIn ? `Sponser` : `Donate a share`}`}
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
			/>
			<DonateModal
				setOpen={setDonateOpen}
				open={donateOpen}
				cancelButtonRef={cancelDonateButtonRef}
				isLoggedIn={isLoggedIn}
			/>
		</>
	);
};

export default FamilyCard;
