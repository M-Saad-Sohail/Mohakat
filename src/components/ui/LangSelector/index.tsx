import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { arabic_flag, english_flag, flag__icon, turkish_flag } from '@/assests';
import downArrow from '@/assests/icons/down-arrow.svg';
import { usePathname } from 'next/navigation';

interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
	error?: string | boolean | undefined;
	title: string;
	className?: string;
	value: string;
	handleChange: any;
}

interface LangOption {
	label: string;
	value: string;
}

const LangSelector: React.FC<IProps> = ({
	onChange,
	error,
	className,
	value,
	name,
	title,
	handleChange,
}) => {
	const options: LangOption[] = [
		{ label: 'English', value: 'en' },
		{ label: 'Arabic', value: 'ar' },
		{ label: 'Turkish', value: 'tr' },
	];

	const flags = {
		en: english_flag,
		ar: arabic_flag,
		tr: turkish_flag,
	};
	const [langValue, setlangValue] = useState('');
	const [open, setOpen] = useState(false);

	const handleLangChange = (opt: LangOption) => {
		setlangValue(opt.label);
		handleChange(opt.value);
		setOpen(false);
	};

	useEffect(() => {
		const val = options.find((opt) => opt.value === value);
		setlangValue(val?.label as string);
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
				className="flex border border-black rounded-[20px] py-2 w-36 justify-center gap-3 cursor-pointer dropdown"
				onClick={() => setOpen((prev) => !prev)}
			>
				<Image
					src={value in flags ? flags[value as 'en' | 'ar' | 'tr'] : flag__icon}
					alt="flag"
					className="flex justify-center w-5 item-center"
				/>
				<p className={`bg-white text-sm text-black font-bold uppercase`}>
					{langValue}
				</p>
				<Image src={downArrow} alt="downArrow" className="w-[10px]" />
			</div>
			{open && (
				<div className=" top-12 shadow-custom bg-white px-2 py-2 rounded-[20px] absolute flex flex-col gap-2 dropdown z-50">
					{options.map((opt) => (
						<span
							key={opt.value}
							onClick={() => handleLangChange(opt)}
							className="bg-black text-white text-sm rounded-[20px] w-32 px-3 text-center py-2 cursor-pointer "
						>
							{opt.label}
						</span>
					))}
				</div>
			)}

			{error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
		</div>
	);
};

export default LangSelector;
