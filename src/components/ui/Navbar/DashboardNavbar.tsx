'use client';
import React, { useEffect, useState } from 'react';
import { language, profile } from '@/assests';
import Image from 'next/image';
import { getUserFromLocalStorage } from '@/utils/auth';
import useDirection from '@/hooks/useDirection';
import Cart from '../Cart';
import { TbBasketDollar } from 'react-icons/tb';
import { useSelector } from 'react-redux';

type IProps = {
	setting?: boolean;
	title: String;
};

const DashboardNavbar = ({ title, setting }: IProps) => {
	let [user, setUser] = useState<{ name: string; role: string } | null>(null);
	useEffect(() => {
		const loggedInUser = getUserFromLocalStorage();
		setUser(loggedInUser);
	}, []);

	const dir = useDirection();
	const [isCartOpen, setIsCartOpen] = useState(false);

	const cartItems = useSelector((state: any) => state.cart);

	return (
		<>
			<div dir={dir} className="flex w-full py-2">
				<h2 className="text-black text-[32px] ps-4 flex items-center w-full my-4 font-bold">
					{title}
				</h2>

				<div className={`items-center  flex float-right w-full justify-end`}>
					{/* <Image
						src={language} // Replace with the path to the user profile image
						alt={''}
						className="w-8 h-8 mx-2 rounded-full"
						style={{ filter: 'invert(100%)' }}
					/> */}
					{user?.role === 'user' && (
						<div
							className=" relative cursor-pointer"
							onClick={() => setIsCartOpen(true)}
						>
							<span className=" absolute top-0 right-0 bg-[#CF7475] text-white text-[10px] rounded-[50%] px-[6px] py-[2px]">
								{cartItems.length > 0 ? cartItems.length : '0'}
							</span>
							<TbBasketDollar className=" text-[40px]" />
						</div>
					)}
					<div dir={dir} className="flex items-center mx-4">
						{/* <Image
							src={profile} // Replace with the path to the user profile image
							alt={''}
							className="w-10 h-10 mx-2 rounded-full"
						/> */}
						<p className="text-black text-[16px]">{user ? user.name.toUpperCase() : ''}</p>
					</div>
				</div>
			</div>
			<Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
		</>
	);
};

export default DashboardNavbar;
