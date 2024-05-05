import Loader from './../Loader';
import React, { useState } from 'react';
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	localeId?: string;
	Color?: string;
	isPadding?: string;
	disabled?: boolean;
}
const Button: React.FC<IProps> = ({
	onClick = () => {},
	type = 'button',
	title,
	isLoading = false,
	className,
	Color,
	isPadding,
	disabled,
}) => {
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
				isLoading || disabled
					? `rounded-[20px] flex items-center justify-center text-center cursor-not-allowed ${isPadding ? isPadding : 'md:px-16 px-10'} `
					: `text-white cursor-pointer text-center ${isPadding ? isPadding : `md:px-6 md:py-2 px-4`} `
			} rounded-md hover:font-bold shadow-lg font-semibold ${className} md:text-sm text-[13px] border-2 border-transparent outline-none py-2 w-fit transition-colors duration-300 ease-in-out`}
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
