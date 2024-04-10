'use client';
import FamilyCard from '@/components/ui/FamilyCard';
import React, { useEffect, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
// ICONS
import ArrowSvg from '@/assests/svgs/arrow.svg';
import Image from 'next/image';
import { getJson } from '@/api/api.instances';
import Loader from '@/components/ui/Loader';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { useTranslations } from 'next-intl';


const FamiliesSection: React.FC<{ isLoggedIn?: boolean }> = ({
	isLoggedIn,
}) => {
	const { user } = useLoggedInUser();
	const [isLoading, setIsLoading] = useState(true);
	const [openDropDown, setOpenDropDown] = useState<boolean[]>([
		false,
		false,
		false,
	]);
	// DropDown
	const handleDropDownClick = (index: number) => {
		let newOpenDropDown: boolean[] = [];
		newOpenDropDown = openDropDown.map((item, i) => {
			return i === index ? !openDropDown[i] : false;
		});
		setOpenDropDown(newOpenDropDown);
	};

	const [familiesData, setFamiliesData] = useState<any[]>([]);
	const t = useTranslations('AddFamilies');

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/families`,
			);
			if (res.success) {
				setFamiliesData(res.familySponser);
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<>
			<section
				className={` ${user ? 'md:w-[90%] py-8' : 'md:w-[80%] py-12'} w-[90%] mx-auto flex flex-col gap-8 `}
			>
				{/* heading and content */}
				{!user && (
					<div className=" flex flex-col gap-2">
						<h2 className=" md:text-3xl text-2xl font-semibold">{t('title')}</h2>
						<p className="md:text-lg text-base font-light">
							{t('description')}
						</p>
					</div>
				)}

				{/* dropdowns */}
				<div className=" flex md:flex-nowrap flex-wrap md:gap-3 gap-3">
					<div className="relative flex flex-col gap-2 md:w-64 w-[48%] ">
						<h3 className=" text-base font-medium"> {t('area')} </h3>
						<button
							className=" flex  justify-between items-center text-left rounded-md bg-[#F8F8F8] text-sm font-medium py-[8px] px-4 w-full cursor-pointer"
							onClick={() => handleDropDownClick(0)}
						>
							<span className=" md:text-base text-sm font-medium text-[#00000080] capitalize ">
								{'Select'}
							</span>
							<span>
								{openDropDown[0] ? (
									<IoIosArrowUp className="text-lg text-[#00000080] cursor-pointer" />
								) : (
									<IoIosArrowDown className="text-lg text-[#00000080] cursor-pointer" />
								)}
							</span>
						</button>
						<div
							className={`${
								openDropDown[0] ? 'block' : 'hidden'
							}  top-20 rounded-lg z-50 absolute w-64 h-[155px] py-[6px] bg-gray-300 scroll-marketplace-dropdown `}
						>
							<p></p>
						</div>
					</div>

					<div className="relative flex flex-col gap-2 md:w-64 w-[48%] ">
						<h3 className=" text-base font-medium"> {t('situation')} </h3>
						<button
							className=" flex  justify-between items-center text-left rounded-md bg-[#F8F8F8] text-sm font-medium py-[8px] px-4 w-full cursor-pointer"
							onClick={() => handleDropDownClick(1)}
						>
							<span className="md:text-base text-sm font-medium text-[#00000080] capitalize ">
								{'Select'}
							</span>
							<span>
								{openDropDown[1] ? (
									<IoIosArrowUp className="text-lg text-[#00000080] cursor-pointer" />
								) : (
									<IoIosArrowDown className="text-lg text-[#00000080] cursor-pointer" />
								)}
							</span>
						</button>
						<div
							className={`${
								openDropDown[1] ? 'block' : 'hidden'
							}  top-20 rounded-lg z-50 absolute w-64 h-[155px] py-[6px] bg-gray-300 scroll-marketplace-dropdown `}
						>
							<p></p>
						</div>
					</div>

					<div className="relative flex flex-col gap-2 md:w-64 w-[48%] ">
						<h3 className=" text-base font-medium">{t('no_of_member')}</h3>
						<button
							className=" flex  justify-between items-center text-left rounded-md bg-[#F8F8F8] text-sm font-medium py-[8px] px-4 w-full cursor-pointer"
							onClick={() => handleDropDownClick(2)}
						>
							<span className="md:text-base text-sm font-medium text-[#00000080] capitalize">
								{'Select'}
							</span>
							<span>
								{openDropDown[2] ? (
									<IoIosArrowUp className="text-lg text-[#00000080] cursor-pointer" />
								) : (
									<IoIosArrowDown className="text-lg text-[#00000080] cursor-pointer" />
								)}
							</span>
						</button>
						<div
							className={`${
								openDropDown[2] ? 'block' : 'hidden'
							}  top-20 rounded-lg z-50 absolute w-64 h-[155px] py-[6px] bg-gray-300 scroll-marketplace-dropdown `}
						>
							<p></p>
						</div>
					</div>
				</div>
				{isLoading ? (
					<div className=" flex justify-center items-center h-32">
						<Loader />
					</div>
				) : familiesData && familiesData.length > 0 ? (
					<>
						{/* cards */}
						<div className=" grid md:grid-cols-3 grid-cols-1 gap-4">
							{familiesData.map((family, i) => (
								<FamilyCard
									key={i}
									familyData={family}
									isLoggedIn={isLoggedIn}
								/>
							))}
						</div>
						{/* pagination */}
						<div className="flex md:flex-row flex-col gap-5 items-center">
							<div className=" flex justify-end md:w-[55%]">
								<button className="flex gap-3 bg-[#000000] text-[#FFFFFF] text-sm font-semibold rounded-3xl px-5 py-3">
									<span>Next Page</span>
									<Image src={ArrowSvg} alt="arrow" />
								</button>
							</div>

							<div className="flex gap-2 justify-end items-center md:w-[45%] text-sm font-medium ">
								<span>Page</span>
								<div className=" border-[2px] border-[#000000] rounded-[6px] px-3">
									1
								</div>
								<span>of</span>
								<span>100</span>
							</div>
						</div>
					</>
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

export default FamiliesSection;
