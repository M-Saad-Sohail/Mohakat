'use client';
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { QuickDonationModalType } from '@/types';
import Button from '../LandingPage/Button';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useSelector } from 'react-redux';
// ICONS
import { IoClose } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

const QuickDonationModal: React.FC<QuickDonationModalType> = ({
	open,
	setOpen,
	cancelButtonRef,
}) => {
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const { user } = useLoggedInUser();
	const t = useTranslations('QuickDonation');
	const [totalAmount, setTotalAmount] = useState<number>(0);
	const [openInputField, setOpenInputField] = useState<boolean>(false);
	const [inputAmount, setInputAmount] = useState<number>(0);
	const amountQuiclDonation: number[] = [25, 50, 100, 200, 400];
	const currencyState = useSelector((state: any) => state.currency);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		setInputAmount(isNaN(value) ? 0 : value);
	};

	useEffect(() => {
		setTotalAmount(inputAmount === 0 ? 0 : inputAmount);
	}, [inputAmount]);

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
											{t('title')}
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
											{t('purposeTitle')}
										</h4>
										<input
											type="text"
											disabled
											value={t('purposeValue')}
											className=" py-2 px-3 text-[15px] font-medium rounded-xl text-[#737491] border border-[#dfdfeb]"
										/>
									</div>
									<div className=" grid grid-cols-3 gap-4">
										{amountQuiclDonation.map((price, i) => (
											<button
												key={i}
												onClick={() => {
													setOpenInputField(false);
													setTotalAmount(price);
												}}
												className={` h-11 text-sm font-semibold border rounded-xl transition-colors duration-300 ease-in-out ${price === totalAmount ? 'text-[#CF7475] border-[#CF7475] ' : 'text-[#4a4b65] border-[#dfdfeb]'} hover:text-[#CF7475] hover:border-[#CF7475] `}
											>
												{currencyState.key} {price}
											</button>
										))}
										<button
											className={` h-11 text-sm font-semibold border rounded-xl transition-colors duration-300 ease-in-out ${openInputField ? 'text-[#CF7475] border-[#CF7475] ' : 'text-[#4a4b65] border-[#dfdfeb]'} hover:text-[#CF7475] hover:border-[#CF7475] `}
											onClick={() => {
												setTotalAmount(0);
												setOpenInputField(true);
											}}
										>
											{t('anotherAmount')}
										</button>
									</div>
									{openInputField && (
										<div>
											<input
												type="text"
												className=" w-full py-2 px-3 text-[15px] font-medium rounded-xl text-[#737491] border border-[#dfdfeb] focus:outline-[#CF7475]"
												value={inputAmount || ''}
												onChange={handleInputChange}
												placeholder={t('inputPlaceholder')}
												autoFocus
											/>
										</div>
									)}
									<div className=" flex justify-between">
										<h3 className="text-lg text-[#4a4b65] font-semibold">
											{t('totalTitle')}
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
											title={t('button')}
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
