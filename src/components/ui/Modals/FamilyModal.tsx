/* eslint-disable react/display-name */
'use client';
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FamilyModalType } from '@/types';
import Button from '../LandingPage/Button';
import Image from 'next/image';
// ICONS
import { IoClose } from 'react-icons/io5';
import PeopleSvg from '@/assests/icons/people.svg';
import LocationSvg from '@/assests/icons/location.svg';
import { useTranslations } from 'next-intl';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useSelector } from 'react-redux';
import { calculateAmount } from '@/utils/calculateAmount';

const FamilyModal: React.FC<FamilyModalType> = ({
	open,
	setOpen,
	setDonate,
	cancelButtonRef,
	isLoggedIn,
	familyInfo,
	amount,
	isTableView = false,
	setAmount,
}) => {
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const { user } = useLoggedInUser();
	const t = useTranslations('AddFamilies.form');
	const t1 = useTranslations('HeroMainSection.btns');
	const t3 = useTranslations('FamiliesMainSection');
	const currencyState = useSelector((state: any) => state.currency);

	const [selectedOption, setSelectedOption] = useState<string>('1');

	// Function to handle radio button change
	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
		let newAmount = calculateAmount(
			event.target.value,
			familyInfo?.numberOfFamilyMembers,
			currencyState?.basePriceOne,
			currencyState?.basePriceTwo,
		);
		setAmount && setAmount(newAmount as any);
	};

	useEffect(() => {
		setSelectedOption('1');
		let newAmount = calculateAmount(
			'1',
			familyInfo?.numberOfFamilyMembers,
			currencyState?.basePriceOne,
			currencyState?.basePriceTwo,
		);
		setAmount && setAmount(newAmount as any);
	}, [currencyState, familyInfo]);

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-[100]"
					initialFocus={cancelButtonRef}
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div
						dir={dir}
						className="fixed inset-0 z-10 w-screen overflow-y-auto"
					>
						<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel
									className={` ${isTableView ? 'md:h-[500px]' : familyInfo?.familyMemberDetail?.length > 0 ? 'h-[590px]' : 'h-[500px] '}  flex flex-col justify-between px-5  py-5 transform overflow-hidden rounded-2xl bg-[#fff] text-left shadow-xl transition-all md:w-[600px] w-full `}
								>
									{/* first div */}
									<div className="flex justify-between items-center w-full">
										<Button
											title={familyInfo?.currentSituation || t3('Worst')}
											Color="#CF7475"
										/>
										<div className=" rounded-[50%] bg-[#857b7b40] hover:bg-[#857b7b80] p-1">
											<IoClose
												className=" text-[26px] text-[#4a4b65] cursor-pointer"
												onClick={() => setOpen(false)}
											/>
										</div>
									</div>

									<div className=" flex justify-between">
										<h2 className=" text-xl md:text-2xl font-semibold">
											{familyInfo?.breadWinnerName}
										</h2>
										<p className="flex gap-1 text-[#4a4b65] text-xl font-bold">
											{!isTableView && <span>{currencyState?.key}</span>}
											<span>{amount}</span>
										</p>
									</div>
									{/* second div */}
									<div className=" flex flex-col gap-2">
										<div className=" flex  md:gap-5">
											{/* first column */}
											<div className=" flex flex-1 flex-col gap-3">
												<div className=" flex items-center gap-1 md:gap-[6px]">
													<span className=" text-xs md:text-base font-semibold">
														{t('id.title')}:
													</span>
													<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
														{familyInfo?.idNumber}
													</span>
												</div>
												<div className=" flex items-center gap-1 md:gap-[6px]">
													<span className=" text-xs md:text-base font-semibold">
														{t('martialstatus.title')}:
													</span>
													<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
														{familyInfo?.maritalStatus}
													</span>
												</div>
												<div className=" flex items-center gap-1 md:gap-[6px]">
													<span className=" text-xs md:text-base font-semibold">
														{t('losesinwar.title')}:
													</span>
													<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
														{familyInfo?.lossesInWar}
													</span>
												</div>

												<div className=" flex items-center gap-1 md:gap-[6px]">
													<span className=" text-xs md:text-base font-semibold">
														{t('MartyrInFamily.title')}:
													</span>
													<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
														{familyInfo?.numberOfMartyrInFamily}
													</span>
												</div>
											</div>

											{/* second column */}
											<div className=" flex flex-1 flex-col gap-3">
												<div className=" flex items-center gap-1 md:gap-[6px]">
													<span className=" text-xs md:text-base font-semibold">
														{t('dob.title')}:
													</span>
													<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
														{familyInfo?.dateOfBirth}
													</span>
												</div>
												<div className=" flex items-center gap-1 md:gap-[6px]">
													<span className=" text-xs md:text-base font-semibold">
														{t('gender.title')}:
													</span>
													<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
														{familyInfo?.gender}
													</span>
												</div>
												<div className=" flex items-center gap-1 md:gap-[6px]">
													<span className=" text-xs md:text-base font-semibold">
														{t('FamilyMembers.title')}:
													</span>
													<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
														{familyInfo?.numberOfFamilyMembers}
													</span>
												</div>

												<div className=" flex items-center gap-1 md:gap-[6px]">
													<span className=" text-xs md:text-base font-semibold">
														{t('InfectedInFamily.title')}:
													</span>
													<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
														{familyInfo?.numberOfInfectedInFamily}
													</span>
												</div>
											</div>
										</div>
										<div className=" mt-2 flex flex-col gap-3">
											<div className=" flex items-center gap-1 md:gap-[6px]">
												<span className=" text-xs md:text-base font-semibold">
													{t('previousresidence.title')}:
												</span>
												<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
													{familyInfo?.areaOfPreviousResidence}
												</span>
											</div>
											<div className=" flex items-center gap-1 md:gap-[6px]">
												<span className=" text-xs md:text-base font-semibold">
													{t('currentresidence.title')}:
												</span>
												<span className=" text-xs md:text-base text-[#4a4b65] font-normal">
													{familyInfo?.areaOfCurrentResidence}
												</span>
											</div>
										</div>
									</div>

									{familyInfo?.familyMemberDetail?.length > 0 && (
										<div className=" flex flex-col gap-2">
											<h2 className="  text-lg font-semibold">
												{t3("memberDetail")}
											</h2>

											{/* members */}
											<div className="flex gap-4 w-full overflow-x-scroll scrollbarHide">
												{familyInfo?.familyMemberDetail?.map(
													(item: any, i: number) => (
														<div
															key={i}
															className=" flex flex-col gap-1 rounded-lg bg-[#CF7475] py-[10px] px-[20px] text-[#FFFFFF]"
														>
															<p className=" text-sm font-normal w-max h-max">
																<span className=" text-sm font-semibold">
																	{t('name.title')}:{' '}
																</span>
																{item?.memberName}
															</p>
															<p className=" text-sm font-normal w-max h-max">
																<span className=" text-sm font-semibold">
																	{t('gender.title')}:{' '}
																</span>
																{item?.memberGender}
															</p>
															<p className=" text-sm font-normal w-max h-max">
																<span className=" text-sm font-semibold">
																	{t('age.title')}:{' '}
																</span>
																{item?.memberAge}
															</p>
														</div>
													),
												)}
											</div>
										</div>
									)}
									{/* duration */}
									{user && !isTableView && (
										<div className=" flex flex-col gap-2">
											<h2 className="flex text-base md:text-lg font-semibold">
												{t3('selectduration')}
											</h2>
											{/* durations */}
											<div className=" flex gap-3 overflow-x-scroll scrollbarHide w-full">
												<input
													type="radio"
													name="month"
													id="1month"
													value="1"
													checked={selectedOption === '1'}
													onChange={handleOptionChange}
												/>
												<label className=" flex items-center gap-2 text-sm font-semibold">
													<span>1</span>
													<span>{t3('month')}</span>
												</label>
												<input
													type="radio"
													name="month"
													id="3month"
													value="3"
													checked={selectedOption === '3'}
													onChange={handleOptionChange}
												/>
												<label className=" flex items-center gap-2 text-sm font-semibold">
													<span>3</span>
													<span>{t3('month')}</span>
												</label>

												<input
													type="radio"
													name="month"
													id="6month"
													value="6"
													checked={selectedOption === '6'}
													onChange={handleOptionChange}
												/>
												<label className=" flex items-center gap-2 text-sm font-semibold">
													<span>6</span>
													<span>{t3('month')}</span>
												</label>

												<input
													type="radio"
													name="month"
													id="9month"
													value="9"
													checked={selectedOption === '9'}
													onChange={handleOptionChange}
												/>

												<label className=" flex items-center gap-2 text-sm font-semibold">
													<span>9</span>
													<span>{t3('month')}</span>
												</label>

												<input
													type="radio"
													name="month"
													id="12month"
													value="12"
													checked={selectedOption === '12'}
													onChange={handleOptionChange}
												/>
												<label className=" flex items-center gap-2 text-sm font-semibold">
													<span>12</span>
													<span>{t3('month')}</span>
												</label>
											</div>
										</div>
									)}
									{/* btns */}
									{!isTableView && (
										<div className=" flex gap-2">
											<Button
												onClick={() => {
													setOpen(false);
													setDonate && setDonate(true);
												}}
												title={t1('Donate.title')}
												Color="#8DAE8E"
												className=" md:px-12"
											/>
										</div>
									)}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};
FamilyModal.displayName = "FamilyModal";
export default FamilyModal;
