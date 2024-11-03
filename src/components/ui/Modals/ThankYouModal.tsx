'use client';
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ThankYouModalType } from '@/types';
import { usePathname } from 'next/navigation';
import Button from '../LandingPage/Button';
// ICONS
import { IoClose } from 'react-icons/io5';
import { SiTicktick } from 'react-icons/si';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';

const ThankYouModal: React.FC<ThankYouModalType> = React.memo(({
	open,
	setOpen,
	cancelButtonRef,
}) => {
	const { url, dir, locale, changeLocale, replace } = useLocaleRouter();
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const t = useTranslations('ThankModal');
	let text = t('title');
	let parts = text.split(',');

	let beforeComma = parts[0];
	let afterComma = parts[1];

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-[999999]"
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
									className={`flex flex-col px-5 py-5 transform overflow-hidden rounded-2xl bg-[#fff] text-center shadow-xl transition-all md:w-[500px] w-full ${currentPath === 'ar' ? 'h-[300px]' : 'h-[335px]'}`}
								>
									{/* first div */}
									<div className="flex justify-end items-end w-full">
										<div className=" rounded-[50%] bg-[#857b7b40] hover:bg-[#857b7b80] p-1">
											<IoClose
												className=" text-[26px] text-[#4a4b65] cursor-pointer"
												onClick={() => setOpen(false)}
											/>
										</div>
									</div>

									<div className=" flex flex-col gap-5">
										{/* image and text div */}
										<div className=" flex flex-col justify-center items-center gap-11 text-center">
											{/* image */}
											<div className=" flex justify-center items-center w-full h-full">
												<IoMdCheckmarkCircleOutline className="text-[85px] text-[#8DAE8E]" />
											</div>

											<div className="flex flex-col justify-center items-center gap-1">
												<h3 className=" text-lg font-medium text-[#36454F]">
													{beforeComma}!
												</h3>
												<h3 className=" text-lg font-medium text-[#36454F]">
													{afterComma}
												</h3>
											</div>
										</div>

										{/* btn */}
										<div>
											<Button
												title={t('button')}
												Color="#8DAE8E"
												onClick={() => {
													setOpen(false);
													replace('/');
												}}
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
});

export default ThankYouModal;
