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
		<div>
			<button
				onClick={onClick}
				disabled={isLoading}
				type={type}
				className={`${
					isLoading
						? 'bg-disabled rounded-md text-disabled flex items-center justify-center cursor-not-allowed'
						: 'text-white bg-primary  cursor-pointer shadow-lg'
				} rounded-md shadow-custom border-main font-bold py-3 px-4 w-full h-[65px] ${className}`}
			>
				{isLoading && <Loader />}
				{title}
			</button>
		</div>
	);
};

export default Button;
