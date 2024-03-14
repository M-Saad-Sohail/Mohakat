import React from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
	error?: string | boolean | undefined;
	title: string;
	options: Array<{ value: string; label: string }>;
	className?:string
}
const Select: React.FC<IProps> = ({
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
			<label className="font-bold text-[20px] text-primary">{title}</label>

			<select
				className={`p-3 w-full focus:outline-none bg-[#E8E8E8]  max-w-[700px] text-primary ${className}`}
				onChange={onChange}
				value={value} 
				name={name}
			>
				{options.map((opt) => (
					<option value={opt.value} key={opt.value}>
						{opt.label}
					</option>
				))}
			</select>

			{error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
		</div>
	);
};

export default Select;
