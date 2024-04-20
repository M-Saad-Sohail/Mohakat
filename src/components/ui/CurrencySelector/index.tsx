import { setIsCurrencyStateAction } from '@/state/currency';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../LandingPage/Button';

interface CurrencySelectorType {
	className?: string;
}

interface CurrencyOption {
	label: string;
	key: string;
	basePriceOne: number;
	basePriceTwo: number;
}

const options: CurrencyOption[] = [
	{ label: 'Dollar', key: 'USD', basePriceOne: 300, basePriceTwo: 500 },
	{ label: 'Euro', key: 'EUR', basePriceOne: 281, basePriceTwo: 469 },
	{ label: 'Kuwaiti Dinar', key: 'KWD', basePriceOne: 92, basePriceTwo: 154 },
	{ label: 'Qatari Riyal', key: 'QAR', basePriceOne: 1092, basePriceTwo: 1820 },
	{ label: 'Suadi Riyal', key: 'SAR', basePriceOne: 1125, basePriceTwo: 1875 },
	{
		label: 'Turkish Lira',
		key: 'TRY',
		basePriceOne: 9776,
		basePriceTwo: 16294,
	},
];

const CurrencySelector: React.FC<CurrencySelectorType> = ({ className }) => {
	const dispatch = useDispatch();
	const currencyState = useSelector((state: any) => state.currency);
	const [open, setOpen] = useState(false);

	const handleCurrencyChange = (opt: CurrencyOption) => {
		dispatch(setIsCurrencyStateAction(opt));
		setOpen(false);
	};

	useEffect(() => {
		handleCurrencyChange(options[0]);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				event.target instanceof HTMLElement &&
				!event.target.closest('.dropdown')
			) {
				setOpen(false);
			}
		};

		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div className={` relative flex flex-col ${className}`}>
			<div
				className="flex items-center justify-center gap-3 border border-black rounded-[50%] w-[42px] h-10 cursor-pointer dropdown"
				onClick={() => setOpen((prev) => !prev)}
			>
				<p className={` text-sm text-black font-bold uppercase`}>
					{currencyState?.key}
				</p>
			</div>
			{open && (
				<div className=" h-[140px] top-12 right-0 shadow-custom bg-white pl-2 py-2 rounded-[16px] absolute  dropdown z-50 ">
					<div className=" h-full flex flex-col gap-2 overflow-y-auto currency-scrollbar pr-1">
						{options.map((opt, i) => (
							<span
								key={i}
								onClick={() => handleCurrencyChange(opt)}
								className="bg-black text-white text-sm rounded-xl w-32 px-3 py-[6px] text-center  cursor-pointer hover:bg-white border-2 border-transparent hover:border-[#000000] hover:text-[#000000] transition-colors duration-300 ease-in-out "
							>
								{opt.label}
							</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CurrencySelector;
