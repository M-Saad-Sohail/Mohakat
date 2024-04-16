import React, { useEffect, useState } from 'react';

interface CurrencySelectorType {
	className?: string;
}

interface CurrencyOption {
	label: string;
	icon: string;
}

const CurrencySelector: React.FC<CurrencySelectorType> = ({ className }) => {
	const options: CurrencyOption[] = [
		{ label: 'Dollar', icon: 'en' },
		{ label: 'Dinar', icon: 'ar' },
		{ label: 'Riyal', icon: 'tr' },
	];
	const [open, setOpen] = useState(false);
	const handleCurrencyChange = (opt: CurrencyOption) => {
		setOpen(false);
	};

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
			{open && (
				<div className=" top-12 shadow-custom bg-white px-2 py-2 rounded-[20px] absolute flex flex-col gap-2 dropdown z-50">
					{options.map((opt, i) => (
						<span
							key={i}
							onClick={() => handleCurrencyChange(opt)}
							className="bg-black text-white text-sm rounded-[20px] w-32 px-3 text-center py-2 cursor-pointer "
						>
							{opt.label}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default CurrencySelector;
