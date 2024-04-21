import Loader from './../Loader';
import React, { useState } from 'react';
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	localeId?: string;
	Color?: string;
	isPadding?: string;
}
const Button: React.FC<IProps> = ({
	onClick = () => {},
	type = 'button',
	title,
	isLoading = false,
	className,
	Color,
	isPadding
}) => {
	console.log(Color);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	return (
		<button
			onClick={onClick}
			disabled={isLoading}
			type={type}
			className={`${
				isLoading
					? 'rounded-[20px] flex items-center justify-center text-center cursor-not-allowed md:px-16 px-10'
					: `text-white cursor-pointer text-center shadow-lg ${isPadding ? isPadding : `md:px-6 md:py-2 px-4`} `
			} rounded-xl shadow-custom font-semibold ${className} md:text-sm text-[13px] border-2 border-transparent outline-none py-2 w-fit transition-colors duration-300 ease-in-out`}
			style={{
				backgroundColor: !isLoading && isHovered ? 'white' : Color,
				borderColor: isHovered ? Color : 'transparent',
				color: isHovered ? Color : 'white',
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{isLoading ? <Loader style={{ color: 'white' }} /> : title}
		</button>
	);
};

export default Button;
