import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { arabic_flag, english_flag, flag__icon, turkish_flag } from '@/assests';
import downArrow from '@/assests/icons/down-arrow.svg';
import EarthSvg from '@/assests/images/landing-page/earth.svg';
import { useTranslations } from 'next-intl';

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
	const t = useTranslations('LangSelect');

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
				!event.target.closest('.lang-dropdown')
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
				className="md:flex hidden border border-black rounded-xl py-2 w-36 justify-center gap-3 cursor-pointer lang-dropdown"
				onClick={() => setOpen((prev) => !prev)}
			>
				<Image
					src={value in flags ? flags[value as 'en' | 'ar' | 'tr'] : flag__icon}
					alt="flag"
					className="flex justify-center w-5 item-center"
				/>
				<p className={`bg-white text-sm text-black font-bold uppercase`}>
					{t(langValue)}
				</p>
				<Image src={downArrow} alt="downArrow" className="w-[10px]" />
			</div>
			<Image
				src={EarthSvg}
				alt="earth"
				className=" md:hidden flex text-2xl w-full"
				onClick={() => setOpen((prev) => !prev)}
			/>
			{open && (
				<div className=" top-12 md:right-auto right-0 shadow-custom bg-white px-2 py-2 rounded-xl absolute flex flex-col gap-2 lang-dropdown z-50">
					{options.map((opt) => (
						<span
							key={opt.value}
							onClick={() => handleLangChange(opt)}
							className="bg-black text-white text-sm rounded-xl w-32 px-3 py-[6px] text-center  cursor-pointer hover:bg-white border-2 border-transparent hover:border-[#000000] hover:text-[#000000] transition-colors duration-300 ease-in-out  "
						>
							{t(opt.label)}
						</span>
					))}
				</div>
			)}

			{error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
		</div>
	);
};

export default LangSelector;
