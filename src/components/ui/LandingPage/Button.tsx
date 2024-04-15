import Loader from './../Loader';
import React from 'react';
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	localeId?: string;
}
const Button: React.FC<IProps> = ({
	onClick = () => {},
	type = 'button',
	title,
	isLoading = false,
	className,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={isLoading}
			type={type}
			className={`${
				isLoading
					? 'rounded-[20px] flex items-center justify-center text-center cursor-not-allowed'
					: 'text-white cursor-pointer text-center shadow-lg'
			} rounded-[20px] shadow-custom font-semibold md:text-sm text-[13px] border-none outline-none md:px-6 px-4 md:py-[10px] py-2 w-fit ${className}`}
		>
			{isLoading ? <Loader style={{ color: 'white' }} /> : title}
		</button>
	);
};

export default Button;
