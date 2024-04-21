import { setIsCurrencyStateAction } from '@/state/currency';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

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
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
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
				!event.target.closest('.currency-dropdown')
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
				className="flex items-center justify-center gap-3 border border-black rounded-[50%] w-[30px] md:w-[42px] h-[30px] md:h-10 cursor-pointer currency-dropdown"
				onClick={() => setOpen((prev) => !prev)}
			>
				<p className={` md:text-sm text-[10px] text-black font-bold uppercase`}>
					{currencyState?.key}
				</p>
			</div>
			{open && (
				<div
					className={` ${currentPath === 'ar' ? ' left-0 pr-2' : 'right-0 pl-2'} h-[140px] top-12 shadow-custom bg-white  py-2 rounded-xl absolute  currency-dropdown z-[5000] `}
				>
					<div
						className={` h-full flex flex-col gap-2 overflow-y-auto currency-scrollbar  ${currentPath === 'ar' ? 'pl-1' : ' pr-1'}`}
					>
						{options.map((opt, i) => (
							<span
								key={i}
								onClick={() => handleCurrencyChange(opt)}
								className="bg-black text-white md:text-sm text-xs rounded-xl w-32 px-3 py-[6px] text-center  cursor-pointer hover:bg-white border-2 border-transparent hover:border-[#000000] hover:text-[#000000] transition-colors duration-300 ease-in-out "
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
