'use client';
import Image from 'next/image';
import { signIn__image } from '@/assests';
import { useCallback, useEffect, useState } from 'react';
import useDirection from '@/hooks/useDirection';

interface IProps {
	children: React.ReactNode;
	className?: string;
	margin?: string;
}

const AuthLayout: React.FC<IProps> = ({ children, className = '', margin }) => {
	const [loading, setLoading] = useState(false);
	const toggleBodyScrolling = useCallback(() => {
		const body = document.querySelector('body');
		if (body) {
			body.style.color = 'bg-main';
		}
	}, []);

	useEffect(() => {
		toggleBodyScrolling();
	}, [toggleBodyScrolling]);

	const dir = useDirection();

	return (
		<div dir={dir} className="bg-main overflow-y-hidden">
			<div className="flex flex-col" style={{ overflow: 'hidden' }}>
				<div className="flex-1 w-full flex justify-center items-center md:flex-row gap-x-5">
					<div className={`md:w-1/2 w-full relative ${className}`}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
