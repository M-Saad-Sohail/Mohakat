import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// ICONS
import { logo } from '@/assests';
import Logo from '@/assests/icons/newlogo.svg';
import Facebook from '@/assests/icons/fb.png';
import Twitter from '@/assests/icons/twitter.png';
import Linkedin from '@/assests/icons/linkedin.png';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { usePathname } from 'next/navigation';

// REACT ICONS
import { FaTwitterSquare, FaFacebookSquare } from 'react-icons/fa';
import { FaLinkedin, FaSquareInstagram } from 'react-icons/fa6';
import CurrencyModal from '../Modals/CurrencyModal';
import { useSelector } from 'react-redux';

const TopBar = () => {
	const t = useTranslations('Footer');
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const cartItems = useSelector((state: any) => state.cart);
	const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
	const cancelCurrencyModalButtonRef = useRef(null);
	const currencyState = useSelector((state: any) => state.currency);
	return (
		<>
			<div className=" bg-[#BB9B6C] px-10 py-2 flex justify-between items-center z-[99999]">
				{/* social links */}
				<div className=" flex gap-3">
					{/* fb */}
					<Link
						href={`${currentPath == 'en' ? 'https://www.facebook.com/profile.php?id=61558851476057' : currentPath == 'tr' ? 'https://www.facebook.com/profile.php?id=61558467735301' : 'https://www.facebook.com/moakhatorg/'}`}
						target="_blank"
					>
						<FaFacebookSquare className=" text-[25px] text-[#1877F2] cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#3b5998]" />
					</Link>

					{/* twitter */}
					<Link
						href={`${currentPath == 'en' ? 'https://twitter.com/MoakhatEn' : currentPath == 'tr' ? 'https://twitter.com/MoakhatTr' : 'https://twitter.com/moakhatorg'}`}
						target="_blank"
					>
						<FaTwitterSquare className=" text-[25px] text-[#1DA1F2] cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#3ea9f4]" />
					</Link>

					{/* insta */}

					<Link
						href={`${currentPath == 'en' ? 'https://www.instagram.com/moakhat.en/' : currentPath == 'tr' ? 'https://www.instagram.com/kardesliktr/' : 'https://www.instagram.com/moakhatorgtr/'}`}
						target="_blank"
					>
						<FaSquareInstagram className=" text-[25px] text-[#C13584] cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#833ab4] rounded-[10]" />
					</Link>
				</div>

				{/* currency */}
				<div>
					<div
						className="flex items-center justify-center gap-3 border border-black rounded-[50%] w-[25px] md:w-[37px] h-[25px] md:h-9 cursor-pointer currency-dropdown"
						onClick={() => setCurrencyModalOpen((prev) => !prev)}
					>
						<p
							className={` md:text-sm text-[10px] text-black font-bold uppercase`}
						>
							{currencyState?.key}
						</p>
					</div>
				</div>
			</div>
			<CurrencyModal
				open={currencyModalOpen}
				setOpen={setCurrencyModalOpen}
				cancelButtonRef={cancelCurrencyModalButtonRef}
			/>
		</>
	);
};

export default TopBar;
