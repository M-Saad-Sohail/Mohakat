'use client';
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FamilyModalType, QuickDonationModalType } from '@/types';
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

const QuickDonationModal: React.FC<QuickDonationModalType> = ({
	open,
	setOpen,
	cancelButtonRef,
}) => {
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const { user } = useLoggedInUser();
	const [totalAmount, setTotalAmount] = useState(0);
	const [openInputField, setOpenInputField] = useState<boolean>(false);
	const amountQuiclDonation: number[] = [25, 50, 100, 200, 400];
	const currencyState = useSelector((state: any) => state.currency);

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
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
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
									className={` flex flex-col justify-between gap-4 p-6 transform overflow-hidden rounded-2xl bg-[#fff] text-left shadow-xl transition-all md:w-[500px] `}
								>
									{/* first div */}
									<div className="flex justify-between items-center w-full">
										<h2 className="  text-xl text-[#4a4b65] font-semibold">
											General & Quick Donation
										</h2>
										<div className=" rounded-[50%] bg-[#857b7b40] hover:bg-[#857b7b80] p-1">
											<IoClose
												className=" text-[26px] text-[#4a4b65] cursor-pointer"
												onClick={() => setOpen(false)}
											/>
										</div>
									</div>
									<div className=" flex flex-col gap-2">
										<h4 className=" text-sm text-[#4a4b65] font-medium">
											Purpose
										</h4>
										<input
											type="text"
											disabled
											value={'General Purpose'}
											className=" py-2 px-3 text-[15px] font-medium rounded-xl text-[#737491] border border-[#dfdfeb]"
										/>
									</div>
									<div className=" grid grid-cols-3 gap-4">
										{amountQuiclDonation.map((price) => (
											<button
												onClick={() => setTotalAmount(price)}
												className=" h-11 text-sm text-[#4a4b65] font-semibold border border-[#dfdfeb] hover:text-[#CF7475] hover:border-[#CF7475] rounded-xl transition-colors duration-300 ease-in-out"
											>
												{currencyState.key} {price}
											</button>
										))}
										<button
											className=" h-11 text-sm text-[#4a4b65] font-semibold border border-[#dfdfeb] hover:text-[#CF7475] hover:border-[#CF7475] rounded-xl transition-colors duration-300 ease-in-out"
											onClick={() => setOpenInputField(true)}
										>
											Another Amount
										</button>
									</div>
									{openInputField && (
										<div>
											<input
												type="text"
												className=" w-full py-2 px-3 text-[15px] font-medium rounded-xl text-[#737491] border border-[#dfdfeb] focus:outline-none"
												placeholder="Enter donation Amount"
											/>
										</div>
									)}
									<div className=" flex justify-between">
										<h3 className="text-lg text-[#4a4b65] font-semibold">
											Total
										</h3>
										<h3 className="text-lg text-[#4a4b65] font-semibold">
											{currencyState.key} {totalAmount}
										</h3>
									</div>
									<div>
										<Button
											onClick={() => {
												setOpen(false);
											}}
											title={'Proceed to Checkout'}
											className=" w-full"
											Color="#CF7475"
										/>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default QuickDonationModal;
