import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import Button from '../LandingPage/Button';
import Image from 'next/image';
import Card from './Card';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

const Cart = ({
	isCartOpen,
	setIsCartOpen,
}: {
	isCartOpen: boolean;
	setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const cartItems = useSelector((state: any) => state.cart);
	const t = useTranslations('Cart');
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				event.target instanceof HTMLElement &&
				!event.target.closest('.cart')
			) {
				setIsCartOpen(false);
			}
		};

		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, [setIsCartOpen]);

	return (
		<div className="  relative">
			{/* Dimmed overlay */}
			{isCartOpen && (
				<div className="fixed inset-0 bg-black opacity-50 z-50"></div>
			)}
			{/* Cart */}
			<div
				className={`cart fixed top-0 h-screen w-80 flex flex-col right-0 transform ${
					isCartOpen ? 'translate-x-0' : 'translate-x-full'
				} transition-transform duration-500 ease-out z-50 bg-white shadow-lg`}
			>
				<div className="flex justify-between px-6 py-5 border-b-[0.5px] border-[#00000080]">
					<h3 className="text-xl font-semibold">{t('title')}</h3>
					<span>
						<IoClose
							onClick={() => setIsCartOpen(false)}
							className="text-3xl cursor-pointer"
						/>
					</span>
				</div>
				<div className=" h-full flex flex-col gap-[10px] px-6 py-5 overflow-y-auto scrollbarHide">
					{cartItems.length > 0 ? (
						cartItems.map((item: any, i: number) => (
							<Card key={i} family={item} />
						))
					) : (
						<h3 className="text-lg text-center font-semibold">
							{t('emptyMessage')}
						</h3>
					)}
				</div>
				<div className=" bg-white w-full flex flex-col justify-between gap-[10px] px-6 pt-3 pb-5">
					<div className=" flex justify-between">
						<h3 className="text-lg font-semibold">{t('total')}</h3>
						<h3 className="text-lg font-semibold">$0</h3>
					</div>
					<Button title={t('button')} className=" bg-[#CF7475] w-full" />
				</div>
				{/* Cart content goes here */}
			</div>
		</div>
	);
};

export default Cart;
