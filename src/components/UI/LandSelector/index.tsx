import React from 'react';
import Image from 'next/image';
import { flag__icon } from '@/assests';


interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
	error?: string | boolean | undefined;
	title: string;
	options: Array<{ value: string; label: string }>;
	className?:string
}

const LangSelector: React.FC<IProps> = ({
	onChange,
	error,
	className,
	value,
	name,
	title,
	options,
}) => {
	return (
		<div className={`flex flex-col ${className}`}>
            <div className='flex'>
            <Image src={flag__icon} alt='flag'className='flex justify-center item-center'/>
			<select
				className={` focus:outline-none bg-white  text-black font-bold uppercase ${className}`}
				onChange={onChange}
				value={value} // Set the value attribute for select
				name={name} // Add the name attribute
			>
				{options.map((opt) => (
					<option value={opt.value} key={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
            </div>

			{error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
		</div>
	);
};

export default LangSelector
