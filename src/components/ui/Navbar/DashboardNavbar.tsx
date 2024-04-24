'use client';
import React, { useEffect, useRef, useState } from 'react';
import { language, profile } from '@/assests';
import Image from 'next/image';
import { getUserFromLocalStorage } from '@/utils/auth';
import useDirection from '@/hooks/useDirection';
import Cart from '../Cart';
import { TbBasketDollar } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import CurrencySelector from '../CurrencySelector';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { FaHome } from 'react-icons/fa';
import CurrencyModal from '../Modals/CurrencyModal';

type IProps = {
	setting?: boolean;
	title: String;
};

const DashboardNavbar = ({ title, setting }: IProps) => {
	let [user, setUser] = useState<{ name: string; role: string } | null>(null);
	const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const cancelCurrencyModalButtonRef = useRef(null);
	const currencyState = useSelector((state: any) => state.currency);
	const cartItems = useSelector((state: any) => state.cart);
	useEffect(() => {
		const loggedInUser = getUserFromLocalStorage();
		setUser(loggedInUser);
	}, []);

	const dir = useDirection();
	const localRouter = useLocaleRouter();

	function redirectToHomePage() {
		localRouter.replace('/'); // Change the URL to your landing page URL
	}

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
					<div
						className="mr-2 text-[40px] cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded-full p-2"
						onClick={() => redirectToHomePage()}
					>
						<FaHome />
					</div>
					{user?.role === 'user' && (
						<div className="flex items-center gap-6">
							<div
								className=" relative cursor-pointer"
								onClick={() => setIsCartOpen(true)}
							>
								<span className=" absolute top-0 right-0 bg-[#CF7475] text-white text-[10px] rounded-[50%] px-[6px] py-[2px]">
									{cartItems.length > 0 ? cartItems.length : '0'}
								</span>
								<TbBasketDollar className=" text-[40px]" />
							</div>
							<div
								className="flex items-center justify-center gap-3 border border-black rounded-[50%] w-[30px] md:w-[42px] h-[30px] md:h-10 cursor-pointer currency-dropdown"
								onClick={() => setCurrencyModalOpen((prev) => !prev)}
							>
								<p
									className={` md:text-sm text-[10px] text-black font-bold uppercase`}
								>
									{currencyState?.key}
								</p>
							</div>
							<CurrencyModal
								open={currencyModalOpen}
								setOpen={setCurrencyModalOpen}
								cancelButtonRef={cancelCurrencyModalButtonRef}
							/>
						</div>
					)}
					<div dir={dir} className="flex items-center mx-6">
						{/* <Image
							src={profile} // Replace with the path to the user profile image
							alt={''}
							className="w-10 h-10 mx-2 rounded-full"
						/> */}
						{/* <p className="text-black text-[16px]">
							{user ? user.name.toUpperCase() : ''}
						</p> */}
					</div>
				</div>
			</div>
			<Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
		</>
	);
};

export default DashboardNavbar;
