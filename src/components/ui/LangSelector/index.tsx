import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
	palestine_flag,
} from '@/assests';
import downArrow from '@/assests/icons/down-arrow.svg';
import EarthSvg from '@/assests/images/landing-page/earth.svg';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';

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
	const { locale } = useLocaleRouter();
	const options: LangOption[] = [
		{ label: 'English', value: 'en' },
		{ label: 'Arabic', value: 'ar' },
		{ label: 'Turkish', value: 'tr' },
	];

	const arrows = {
		en: { left: 'left_arrow', right: 'right_arrow' },
		ar: { left: 'right_arrow', right: 'left_arrow' }, // Reverse arrow direction for Arabic
		tr: { left: 'left_arrow', right: 'right_arrow' },
	};

	const [langValue, setlangValue] = useState(
		options.find((opt) => opt.value === value)?.label,
	);
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
				className="md:flex hidden border-2 border-solid border-[#8DAE8E] rounded-md py-2 w-36 justify-center gap-3 cursor-pointer lang-dropdown"
				onClick={() => setOpen((prev) => !prev)}
			>
				<Image
					src={palestine_flag}
					alt="flag"
					className="flex justify-center w-5 item-center"
				/>
				<p className={`text-sm text-black font-bold uppercase`}>
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
				<div className=" top-12 md:right-auto right-0 shadow-custom bg-white px-2 py-2 rounded-lg absolute flex flex-col gap-2 lang-dropdown z-50">
					{options.map((opt) => {
						if (opt.value === locale) return;
						return (
							<span
								key={opt.value}
								onClick={() => handleLangChange(opt)}
								className="bg-[#8DAE8E] text-white text-sm rounded-md w-32 px-3 py-[6px] text-center  cursor-pointer hover:bg-white border-2 border-transparent hover:border-[#8DAE8E] hover:text-[#8DAE8E] transition-colors duration-300 ease-in-out hover:font-bold  "
							>
								{t(opt.label)}
							</span>
						);
					})}
				</div>
			)}

			{error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
		</div>
	);
};

export default LangSelector;
