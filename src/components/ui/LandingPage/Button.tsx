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
					? 'rounded-[20px] flex items-center justify-center cursor-not-allowed'
					: 'text-white cursor-pointer shadow-lg'
			} rounded-[20px] shadow-custom font-semibold text-sm border-none outline-none px-6 py-[10px] w-fit ${className}`}
		>
			{isLoading ? <Loader style={{ color: 'white' }} /> : title}
		</button>
	);
};

export default Button;
