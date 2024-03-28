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
					? 'rounded-md flex bg-primary items-center justify-center cursor-not-allowed'
					: 'text-white bg-primary  cursor-pointer shadow-lg'
			} rounded-md shadow-custom text-[12px] border-main font-bold px-4 w-full h-[48px] ${className}`}
		>
			{isLoading ? <Loader style={{ color: 'white' }} /> : title}
		</button>
	);
};

export default Button;
