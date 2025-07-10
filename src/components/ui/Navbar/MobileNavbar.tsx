import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { logo } from '@/assests';
import EarthSvg from '@/assests/images/landing-page/earth.svg';
import ProfileSvg from '@/assests/images/landing-page/profile.svg';
import HamBurgurSvg from '@/assests/images/landing-page/hamburgur.svg';
import CrossSvg from '@/assests/images/landing-page/cross.svg';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { getUserFromLocalStorage } from '@/utils/auth';
import { UserType } from '@/state/user/types';
import { Links, PATHS } from '@/contants';
import { TbBasketDollar } from 'react-icons/tb';
import CurrencySelector from '../CurrencySelector';
import LangSelector from '../LangSelector';
import { useSelector } from 'react-redux';
import CurrencyModal from '../Modals/CurrencyModal';
import Button from '../LandingPage/Button';
import { useAuth } from '@/hooks/useAuth';
import TopBar from '../TopBar/TopBar';

const MobileNavbar = ({
	setIsCartOpen,
}: {
	setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const { logoutUser } = useAuth();
	const cartItems = useSelector((state: any) => state.cart);
	const [user, setUser] = useState<UserType | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [active, setActive] = useState(false);
	const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
	const cancelCurrencyModalButtonRef = useRef(null);
	const currencyState = useSelector((state: any) => state.currency);

	const t = useTranslations('Navbar');
	const { url, dir, locale, changeLocale } = useLocaleRouter();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		setIsLoggedIn(!!user);
		setUser(user);
	}, []);

	if (!pathname) {
		return null;
	}

	let currentPathName = pathname
		.replace('/en', '')
		.replace('/ar', '')
		.replace('/tr', '');

	if (currentPathName === '') {
		currentPathName = '/';
	}
	return (
		<>
			<div className={` md:hidden flex flex-col ${active && 'active'}`}>
				<TopBar/>
				<div className="flex justify-between items-center px-5 py-3 border-b-[0.5px] border-[#8DAE8E]">
					{/* logo */}

					<Link href={url('/')}>
						<Image className="mx-2 h-12 w-12" src={logo} alt="" />
					</Link>

					{/* icons */}
					<div className=" flex items-center gap-5">
						{!active && (
							<>
								<LangSelector
									name="language"
									value={locale}
									title=""
									onChange={() => {}}
									handleChange={changeLocale}
									className=" justify-center w-8 h-8 login-icon"
								/>
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
						{user?.role === 'user' && (
							<div
								className=" relative cursor-pointer"
								onClick={() => setIsCartOpen(true)}
							>
								<span className=" absolute top-0 right-0 bg-[#8DAE8E] text-white text-[10px] rounded-[50%] px-[6px] py-[2px]">
									{cartItems.length > 0 ? cartItems.length : '0'}
								</span>
								<TbBasketDollar className=" text-[40px] login-icon" />
							</div>
						)}
						<Image
							onClick={() => {
								setActive((prev) => !prev);
							}}
							src={active ? CrossSvg : HamBurgurSvg}
							alt=""
							className=" w-[22px] h-[22px]"
						/>
					</div>
				</div>

				<div className="navbar-lists py-5">
					{Links.map((link, i) => (
						<Link
							key={link.name}
							href={url(link.link)}
							locale={locale}
							className={`block py-2 px-6 duration-500  ${link.link === currentPathName ? ' font-semibold text-xl' : ' font-normal text-lg text-[#36454F]'}`}
						>
							{t(link.localeId)}
						</Link>
					))}
					<div className=" flex justify-start items-start mt-5 py-2 px-6">
						{isLoggedIn ? (
							<div className=" flex items-center gap-3">
								<span
									onClick={() => {
										logoutUser();
										router.replace(url(PATHS.LOGIN));
									}}
									className="w-fit bg-[#36454F] text-white font-semibold md:text-sm text-[13px] rounded-md px-3 py-2 text-center  cursor-pointer hover:bg-white border-2 border-transparent hover:border-[#36454F] hover:text-[#36454F] transition-colors duration-300 ease-in-out  "
								>
									{t('cta.logout')}
								</span>
								<Link
									href={url(PATHS.DASHBOARD)}
									replace={currentPathName !== '/'}
									locale={locale}
								>
									<Button title={t('cta.go-to-dashboard')} Color="#BB9B6C" />
								</Link>
							</div>
						) : (
							<div className=" flex items-center gap-3">
								<Link
									href={url(PATHS.LOGIN)}
									locale={locale}
									className="w-fit bg-[#36454F] text-white font-semibold md:text-sm text-[13px] rounded-md px-3 py-2 text-center  cursor-pointer hover:bg-white border-2 border-transparent hover:border-[#36454F] hover:text-[#36454F] transition-colors duration-300 ease-in-out  "
								>
									{t('cta.signin')}
								</Link>
								<Link
									href={url(PATHS.BECOME_SPONSOR)}
									locale={locale}
									className="w-fit bg-[#8DAE8E] text-white font-semibold md:text-sm text-[13px] rounded-md px-3 py-2 text-center  cursor-pointer hover:bg-white border-2 border-transparent hover:border-[#8DAE8E] hover:text-[#8DAE8E] transition-colors duration-300 ease-in-out  "
								>
									{t('cta.become-sponsor')}
								</Link>
							</div>
						)}
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

export default MobileNavbar;
