'use client';
import FamilyCard from '@/components/ui/FamilyCard';
import React, { useEffect, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
// ICONS
import Image from 'next/image';
import { getJson } from '@/api/api.instances';
import Loader from '@/components/ui/Loader';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { areasData } from '@/contants/Areas';
import { situationData } from '@/contants/Situations';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import useLocaleRouter from '@/hooks/useLocaleRouter';

const FamiliesSection: React.FC<{ isLoggedIn?: boolean }> = ({
	isLoggedIn,
}) => {
	const pathname = usePathname();
	const currentPath = pathname?.slice(1,3);
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const { user } = useLoggedInUser();
	const t = useTranslations('AddFamilies');
	const [isLoading, setIsLoading] = useState(true);
	const [familiesData, setFamiliesData] = useState<any[]>([]);
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [area, setArea] = useState('');
	const [situation, setSituation] = useState('');
	const [member, setMember] = useState<number>();
	const [openDropDown, setOpenDropDown] = useState<boolean[]>([
		false,
		false,
		false,
	]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 9; // Change as needed

	const getCurrentItems = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredData.slice(startIndex, endIndex);
	};

	// Handlers for pagination buttons
	const goToNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const goToPrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	// DropDown
	const handleDropDownClick = (index: number) => {
		let newOpenDropDown: boolean[] = [];
		newOpenDropDown = openDropDown.map((item, i) => {
			return i === index ? !openDropDown[i] : false;
		});
		setOpenDropDown(newOpenDropDown);
	};

	const filterData = (type: string, value: any) => {
		// FOR AREAS
		if (type === 'area') {
			const filteredItems = familiesData.filter(
				(item) => item.areaOfCurrentResidence === value,
			);
			setFilteredData(filteredItems);
		}
		// FOR SITUATION
		if (type === 'situation') {
			const filteredItems = familiesData.filter(
				(item) => item.currentSituation === value,
			);
			setFilteredData(filteredItems);
		}
		// FOR MEMBERS
		if (type === 'member') {
			const filteredItems = familiesData.filter(
				(item) => item.numberOfFamilyMembers <= value,
			);
			setFilteredData(filteredItems);
		}

		// Reset to first page when filtering
		setCurrentPage(1);
	};

	const handleFamiliesData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setFamiliesData((prev: any) => [
				...prev,
				{
					...data,
					breadWinnerName: data?.breadWinnerName?.inEnglish,
					description: data?.description?.inEnglish,
					familyMemberDetail: data?.familyMemberDetail.map((member: any) => ({
						...member,
						memberName: member?.memberName.inEnglish,
					})),
				},
			]);
		} else if (path === 'ar') {
			setFamiliesData((prev: any) => [
				...prev,
				{
					...data,
					breadWinnerName: data?.breadWinnerName?.inArabic,
					description: data?.description?.inArabic,
					familyMemberDetail: data?.familyMemberDetail.map((member: any) => ({
						...member,
						memberName: member?.memberName.inArabic,
					})),
				},
			]);
		} else if (path === 'tr') {
			setFamiliesData((prev: any) => [
				...prev,
				{
					...data,
					breadWinnerName: data?.breadWinnerName?.inTurkish,
					description: data?.description?.inTurkish,
					familyMemberDetail: data?.familyMemberDetail.map((member: any) => ({
						...member,
						memberName: member?.memberName.inTurkish,
					})),
				},
			]);
		}
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/families`,
			);
			if (res.success) {
				setFamiliesData([]);
				res.familySponser.map((item: any) =>
					handleFamiliesData(currentPath, item),
				);
				// setFilteredData(res.familySponser);
				setIsLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
	  setFilteredData(familiesData)
	}, [familiesData])
	

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				event.target instanceof HTMLElement &&
				!event.target.closest('.closeDropdown')
			) {
				setOpenDropDown([false, false, false]);
			}
		};

		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<>
			<section
			dir={dir}
				className={` ${user ? 'md:w-[90%] py-8' : 'md:w-[80%] py-12'} w-[90%] mx-auto flex flex-col gap-8 `}
			>
				{/* heading and content */}
				{!user && (
					<div className=" flex flex-col gap-2">
						<h2 className=" md:text-3xl text-2xl font-semibold">
							{t('title')}
						</h2>
						<p className="md:text-lg text-base font-light">
							{t('description')}
						</p>
					</div>
				)}

				{/* dropdowns */}
				<div className=" flex md:flex-nowrap flex-wrap md:gap-3 gap-3">
					<div className="relative flex flex-col gap-2 md:w-64 w-[48%]">
						<h3 className=" text-base font-medium"> {t('area')} </h3>
						<button
							className=" flex  justify-between items-center text-left rounded-md bg-[#F8F8F8] text-sm font-medium py-[8px] px-4 w-full cursor-pointer closeDropdown"
							onClick={() => handleDropDownClick(0)}
						>
							<span className=" md:text-base text-sm font-medium text-[#00000080] capitalize ">
								{area ? area : 'Select'}
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
							}  top-20 rounded-lg z-50 absolute w-64 h-[155px] py-[6px] overflow-y-scroll scrollbarHide bg-[#E8E8E8]`}
						>
							{areasData.map((item, i) => {
								return (
									<p
										key={i}
										className={`py-1 px-3 text-base font-medium cursor-pointer hover:text-[#FFFFFF] hover:bg-gray-400`}
										onClick={() => {
											filterData('area', item.value);
											setArea(item.value);
										}}
									>
										{t(`form.currentresidence.${item.label}`)}
									</p>
								);
							})}
						</div>
					</div>

					<div className="relative flex flex-col gap-2 md:w-64 w-[48%] ">
						<h3 className=" text-base font-medium"> {t('situation')} </h3>
						<button
							className=" flex  justify-between items-center text-left rounded-md bg-[#F8F8F8] text-sm font-medium py-[8px] px-4 w-full cursor-pointer closeDropdown"
							onClick={() => handleDropDownClick(1)}
						>
							<span className="md:text-base text-sm font-medium text-[#00000080] capitalize ">
								{situation ? situation : 'Select'}
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
							}  top-20 rounded-lg z-50 absolute w-64 h-[105px] py-[6px] overflow-y-scroll scrollbarHide bg-[#E8E8E8]`}
						>
							{situationData.map((item, i) => {
								return (
									<p
										key={i}
										className={`py-1 px-3 text-base font-medium cursor-pointer hover:text-[#FFFFFF] hover:bg-gray-400`}
										onClick={() => {
											filterData('situation', item.value);
											setSituation(item.value);
										}}
									>
										{t(`form.currentsituation.${item.label}`)}
									</p>
								);
							})}
						</div>
					</div>

					<div className="relative flex flex-col gap-2 md:w-64 w-[48%] ">
						<h3 className=" text-base font-medium">{t('no_of_member')}</h3>
						<button
							className=" flex  justify-between items-center text-left rounded-md bg-[#F8F8F8] text-sm font-medium py-[8px] px-4 w-full cursor-pointer closeDropdown"
							onClick={() => handleDropDownClick(2)}
						>
							<span className="md:text-base text-sm font-medium text-[#00000080] capitalize">
								{member ? member : 'Select'}
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
							}  top-20 rounded-lg z-50 absolute w-64 h-[105px] py-[6px] overflow-y-scroll scrollbarHide bg-[#E8E8E8]`}
						>
							{[3, 6, 9, 12].map((item, i) => {
								return (
									<p
										key={i}
										className={`py-1 px-3 text-base font-medium cursor-pointer hover:text-[#FFFFFF] hover:bg-gray-400`}
										onClick={() => {
											filterData('member', item);
											setMember(item);
										}}
									>
										{/* {t(`form.currentsituation.${item.label}`)} */}
										{item}
									</p>
								);
							})}
						</div>
					</div>
				</div>
				{isLoading ? (
					<div className=" flex justify-center items-center h-32">
						<Loader />
					</div>
				) : filteredData && filteredData.length > 0 ? (
					<>
						{/* cards */}
						<div className=" grid md:grid-cols-3 grid-cols-1 gap-4">
							{getCurrentItems().map((family, i) => (
								<FamilyCard
									key={i}
									familyData={family}
									isLoggedIn={isLoggedIn}
								/>
							))}
						</div>
						{/* pagination */}
						<div className="grid md:grid-cols-3 grid-cols-1 gap-5">
							<div></div>
							<div className=" flex justify-center  gap-4">
								<button
									className={`${currentPage === 1 ? 'bg-[#555555]' : 'bg-[#000000]'} flex items-center gap-3 bg-[#000000] text-[#FFFFFF] text-sm font-semibold rounded-3xl px-5 py-3`}
									onClick={goToPrevPage}
									disabled={currentPage === 1}
								>
									<span>
										<FaArrowLeftLong className=" text-xl" />
									</span>
									<span>Back Page</span>
								</button>
								<button
									className="flex items-center gap-3 bg-[#000000] text-[#FFFFFF] text-sm font-semibold rounded-3xl px-5 py-3"
									onClick={goToNextPage}
									disabled={
										currentPage >= Math.ceil(filteredData.length / itemsPerPage)
									}
								>
									<span>Next Page</span>
									<span>
										<FaArrowRightLong className=" text-xl" />
									</span>
								</button>
							</div>

							<div className="flex gap-2 justify-end items-center text-sm font-medium ">
								<span>Page</span>
								<div className=" border-[2px] border-[#000000] rounded-[6px] px-3">
									{currentPage}
								</div>
								<span>of</span>
								<span>{Math.ceil(filteredData.length / itemsPerPage)}</span>
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
