import React, { useState } from 'react';
import EyeOff from '@/assests/icons/eye_off.svg';
import EyeIcon from '@/assests/icons/eye_icon.svg';
import Image from 'next/image';
import useDirection from '@/hooks/useDirection';
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string | boolean | undefined | any;
	title: string;
	setting?: boolean;
	errorClass?:string | boolean | undefined | any;
	className:string;
}

const Input: React.FC<IProps> = ({
	placeholder,
	onChange,
	error,
	type,
	style,
	className,
	errorClass,
	value,
	name,
	readOnly,
	title,
	min,
	setting,
	disabled,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const dir = useDirection();
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<div
			className={['flex flex-col gap-y-3 relative ', className].join(' ')}
			style={style}
		>
			<label
				className="text-[16px] font-bold font-sans text-[#36454F]"
				htmlFor={name}
			>
				{title}
			</label>
			{type === 'password' ? (
				<div className="relative w-full h-[50px]">
					<input
						
						autoComplete="off"
						placeholder={placeholder}
						onChange={onChange}
						name={name}
						readOnly={readOnly}
						min={min}
						id={name}
						type={showPassword ? 'text' : 'password'}
						value={value}
						className={`py-3 px-5 w-full rounded-md focus:outline-none bg-[#E8E8E8] h-[50px] ${className} ${errorClass}`}
					/>
					<div onClick={togglePasswordVisibility}>
						{showPassword ? (
							<Image
								src={EyeOff}
								alt="eye-off"
								key="eye-off"
								className={`h-5 w-5 cursor-pointer absolute top-[50%] ${dir === 'ltr' ? 'right-4' : 'left-4'} transform translate-y-[-50%]`}
							/>
						) : (
							<Image
								src={EyeIcon}
								alt="eye-icon"
								key="eye-icon"
								className={`h-5 w-5 cursor-pointer absolute top-[50%] ${dir === 'ltr' ? 'right-4' : 'left-4'} transform translate-y-[-50%]`}
							/>
						)}
					</div>
				</div>
			) : (
				<input
					autoComplete="off"
					placeholder={placeholder}
					onChange={onChange}
					name={name}
					readOnly={readOnly}
					id={name}
					min={min && min}
					type={type || 'text'}
					value={value}
					disabled={disabled ? disabled : false}
					className={`py-3 px-5 w-full focus:outline-none bg-[#E8E8E8] h-[50px] text-[15px] max-w-[700px]  ${className} ${errorClass}`}
				/>
			)}

			{error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
		</div>
	);
};

export default Input;
