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
				<h2 className="text-black text-[32px] md:pl-4 pl-2 flex items-center w-full my-4 font-bold">
					{title}
				</h2>

				<div className={` flex w-full items-center justify-end md:gap-6 gap-2 md:pr-4 pr-2`}>
					<div
						className=" text-[40px] cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded-full"
						onClick={() => redirectToHomePage()}
					>
						<FaHome />
					</div>
					{user?.role === 'user' && (
						<>
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
						</>
					)}
				</div>
			</div>
			<Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
			<CurrencyModal
				open={currencyModalOpen}
				setOpen={setCurrencyModalOpen}
				cancelButtonRef={cancelCurrencyModalButtonRef}
			/>
		</>
	);
};

export default DashboardNavbar;
