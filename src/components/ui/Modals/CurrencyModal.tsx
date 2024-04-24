'use client';
import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CurrencyModalType } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCurrencyStateAction } from '@/state/currency';
// ICONS
import { IoClose } from 'react-icons/io5';

interface CurrencyOption {
	label: string;
	key: string;
	basePriceOne: number;
	basePriceTwo: number;
}

const currencyOptions: CurrencyOption[] = [
	{ label: 'Dollar', key: 'USD', basePriceOne: 300, basePriceTwo: 500 },
	{ label: 'Euro', key: 'EUR', basePriceOne: 281, basePriceTwo: 469 },
	{ label: 'Kuwaiti Dinar', key: 'KWD', basePriceOne: 92, basePriceTwo: 154 },
	{ label: 'Qatari Riyal', key: 'QAR', basePriceOne: 1092, basePriceTwo: 1820 },
	{ label: 'Saudi Riyal', key: 'SAR', basePriceOne: 1125, basePriceTwo: 1875 },
	{
		label: 'Turkish Lira',
		key: 'TRY',
		basePriceOne: 9776,
		basePriceTwo: 16294,
	},
];

const CurrencyModal: React.FC<CurrencyModalType> = ({
	open,
	setOpen,
	cancelButtonRef,
}) => {
	const dispatch = useDispatch();
	const currencyState = useSelector((state: any) => state.currency);

	const handleCurrencyChange = (opt: CurrencyOption) => {
		dispatch(setIsCurrencyStateAction(opt));
		setOpen(false);
	};

	useEffect(() => {
		if (Object.keys(currencyState).length !== 0) {
			handleCurrencyChange(currencyState);
		} else {
			handleCurrencyChange(currencyOptions[0]);
		}
	}, []);

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
									className={` flex flex-col justify-between transform overflow-hidden rounded-2xl bg-[#fff] text-left shadow-xl transition-all md:w-[500px] w-full`}
								>
									{/* first div */}
									<div className="flex justify-between items-center w-full px-5 py-4 border-b">
										<h2 className="  text-xl text-[#4a4b65] font-semibold">
											Display Currency
										</h2>
										<div className=" rounded-[50%] bg-[#857b7b40] hover:bg-[#857b7b80] p-1">
											<IoClose
												className=" text-[26px] text-[#4a4b65] cursor-pointer"
												onClick={() => setOpen(false)}
											/>
										</div>
									</div>
									<div className="grid grid-cols-1 divide-y">
										{currencyOptions.map(
											(currency: CurrencyOption, i: number) => (
												<label
													htmlFor={currency.key}
													className={`flex justify-between items-center py-4 pl-5 pr-7 cursor-pointer`}
													onClick={() => handleCurrencyChange(currency)}
													key={currency.key}
												>
													<p
														className={`text-lg text-[#4a4b65] font-medium w-full`}
													>
														{currency.label} ({currency.key})
													</p>
													<input
														type="radio"
														name="selectedCurrency"
														id={currency.key}
														checked={currency.key === currencyState.key}
														className=" focus:outline-none"
													/>
												</label>
											),
										)}
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

export default CurrencyModal;
