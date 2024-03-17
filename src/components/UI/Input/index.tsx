import React, { useState } from 'react';
import EyeOff from '@/assests/icons/eye-off';
import EyeIcon from '@/assests/icons/eye';
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string | boolean | undefined;
	title: string;
	setting?: boolean;
}

const Input: React.FC<IProps> = ({
	placeholder,
	onChange,
	error,
	type,
	style,
	className,
	value,
	name,
	readOnly,
	title,
	setting,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<div
			className={['flex flex-col gap-y-3 relative ', className].join(' ')}
			style={style}
		>
			<label
				className="text-base font-bold font-sans text-primary"
				htmlFor={name}
			>
				{title}
			</label>
			{type === 'password' ? (
				<div className="relative w-full ">
					<input
						autoComplete="off"
						placeholder={placeholder}
						onChange={onChange}
						name={name}
						readOnly={readOnly}
						id={name}
						type={showPassword ? 'text' : 'password'}
						value={value}
						className={`py-3 px-5 w-full rounded-md focus:outline-none bg-[#E8E8E8] h-[60px]  ${className}`}
					/>
					<div onClick={togglePasswordVisibility}>
						{showPassword ? (
							<EyeOff className="h-5 w-5 cursor-pointer absolute top-[50%] right-[30px] transform translate-y-[-50%]" />
						) : (
							<EyeIcon className="h-5 w-5 cursor-pointer absolute top-[50%] right-[30px] transform translate-y-[-50%]" />
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
					type={type || 'text'}
					value={value}
					className={`py-3 px-5 w-full focus:outline-none bg-[#E8E8E8] h-[60px] max-w-[700px]  ${className}`}
				/>
			)}

			{error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
		</div>
	);
};

export default Input;
