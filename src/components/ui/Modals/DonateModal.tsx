'use client';
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DonateModalType } from '@/types';
import Button from '../LandingPage/Button';
import Image from 'next/image';
import Select from '@/components/ui/Select';
import { countriesData } from '@/contants/countries';
// ICONS
import { IoClose } from 'react-icons/io5';
import Input from '@/components/ui//Input';
import ModalInput from '../Input/ModalInput';

const DonateModal: React.FC<DonateModalType> = ({
	open,
	setOpen,
	cancelButtonRef,
	isLoggedIn,
	amount,
	setAmount,
}) => {
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

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
								<Dialog.Panel className=" flex flex-col gap-5 py-6 px-7 rounded-2xl transform overflow-hidden bg-[#fff] text-left shadow-xl transition-all md:w-[30vw] h-[90vh]">
									{/* first div */}
									<div className="flex justify-between items-center w-full border-b-[2px] border-[#00000080] pb-3">
										<h2 className="  text-2xl font-semibold">Donate a Share</h2>
										<div>
											<IoClose
												className=" text-3xl text-[#000] cursor-pointer"
												onClick={() => setOpen(false)}
											/>
										</div>
									</div>

									<div className=" flex flex-col gap-3 overflow-y-scroll h-[420px] scrollbarHide">
										<ModalInput label="Name" placeholder="John" type="text" />
										<ModalInput
											label="Email"
											placeholder="john@gmail.com"
											type="email"
										/>
										<Select
											title={'Country'}
											name="country"
											className="max-w-[800px] w-full mb-8"
											// onChange={handleChange}
											// value={values.country}
											// defaultValue={t('country.default')}
											titleColor="text-[#000000]"
											textColor="text-[#00000080]"
											BgColor="bg-[#F8F8F8]"
											options={countriesData.map((country) => ({
												label: country.name,
												value: country.code,
											}))}
										/>
										<ModalInput
											label="Cardholder Name"
											placeholder="JOHN WILLIAM"
											type="text"
										/>
										<ModalInput
											label="Card Number"
											placeholder="1432 1321 1325 1235"
											type="text"
										/>
										<div className=" flex gap-3">
											<ModalInput
												label="Expiry Date"
												placeholder="07/26"
												type="text"
											/>

											<ModalInput label="CVV" placeholder="551" type="number" />
										</div>
										<ModalInput
											label="Enter Amount"
											placeholder="300"
											type="text"
										/>
									</div>

									<div className=" flex flex-col gap-3 w-full">
										<div className=" flex justify-between items-center">
											<h3 className=" text-2xl font-bold">Total</h3>
											<h3 className=" text-2xl font-bold">${amount}</h3>
										</div>

										<div className=" w-full">
											<Button
												title={`Confirm Payment`}
												className=" bg-[#CF7475]"
											/>
										</div>
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

export default DonateModal;
