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

const FamilyModal: React.FC<FamilyModalType> = ({
	open,
	setOpen,
	setDonate,
	cancelButtonRef,
	isLoggedIn,
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
								<Dialog.Panel className=" flex flex-col gap-5 p-6 transform overflow-hidden rounded-2xl bg-[#fff] text-left shadow-xl transition-all md:w-[45vw]">
									{/* first div */}
									<div className="flex justify-between items-center w-full">
										<Button title={'Very Bad'} className=" bg-[#CF7475]" />
										<div>
											<IoClose
												className=" text-3xl text-[#000] cursor-pointer"
												onClick={() => setOpen(false)}
											/>
										</div>
									</div>

									{/* second div */}

									<div className=" flex justify-between">
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
										{isLoggedIn && (
											<span className=" text-xl font-bold">$300</span>
										)}
									</div>

									{/* content */}
									<div className=" text-base font-light w-full">
										<p>
											Lorem, ipsum dolor sit amet consectetur adipisicing elit.
											Ipsam molestias, debitis veniam, suscipit dolor ex beatae
											libero omnis delectus autem, amet minima? Delectus magni
											atque soluta exercitationem modi, fugit doloremque!
										</p>
									</div>

									{/* member details */}
									<div className=" flex flex-col gap-2">
										<h2 className="  text-lg font-semibold">Member Details</h2>

										{/* members */}
										<div className="flex gap-4 w-full overflow-x-scroll scrollbarHide">
											<div className=" flex flex-col gap-1 rounded-lg bg-[#CF7475] py-[10px] px-[20px] text-[#FFFFFF]">
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">Name: </span>
													Yasmin Khan
												</p>
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">
														Gender:{' '}
													</span>
													Female
												</p>
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">Age: </span>
													24
												</p>
											</div>

											<div className=" flex flex-col gap-1 rounded-lg bg-[#CF7475] py-[10px] px-[20px] text-[#FFFFFF]">
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">Name:</span>
													Yasmin Khan
												</p>
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">
														Gender:
													</span>
													Female
												</p>
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">Age:</span>24
												</p>
											</div>

											<div className=" flex flex-col gap-1 rounded-lg bg-[#CF7475] py-[10px] px-[20px] text-[#FFFFFF]">
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">Name:</span>
													Yasmin Khan
												</p>
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">
														Gender:
													</span>
													Female
												</p>
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">Age:</span>24
												</p>
											</div>

											<div className=" flex flex-col gap-1 rounded-lg bg-[#CF7475] py-[10px] px-[20px] text-[#FFFFFF]">
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">Name:</span>
													Yasmin Khan
												</p>
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">
														Gender:
													</span>
													Female
												</p>
												<p className=" text-sm font-normal w-max h-max">
													<span className=" text-sm font-semibold">Age: </span>
													24
												</p>
											</div>
										</div>
									</div>

									{/* duration */}
									{isLoggedIn && (
										<div className=" flex flex-col gap-2">
											<h2 className="  text-lg font-semibold">
												Select Duration
											</h2>
											{/* durations */}
											<div className=" flex gap-3">
												<input type="radio" name="month" id="3month" />
												<label className=" text-sm font-semibold">
													3 Month(s)
												</label>

												<input type="radio" name="month" id="6month" />
												<label className=" text-sm font-semibold">
													6 Month(s)
												</label>

												<input type="radio" name="month" id="9month" />
												<label className=" text-sm font-semibold">
													9 Month(s)
												</label>

												<input type="radio" name="month" id="12month" />
												<label className=" text-sm font-semibold">
													12 Month(s)
												</label>
											</div>
										</div>
									)}
									{/* btns */}
									<div className=" flex gap-2">
										<Button
											onClick={() => {
												setOpen(false);
												setDonate(true);
											}}
											title={`Donate`}
											className=" bg-[#CF7475]"
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

export default FamilyModal;
