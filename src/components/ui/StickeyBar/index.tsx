import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import stickeySvg1 from '@/assests/svgs/stickeybar/stickeybar-1.svg';
import stickeySvg2 from '@/assests/svgs/stickeybar/stickeybar-2.svg';
import stickeySvg3 from '@/assests/svgs/stickeybar/stickeybar-3.svg';
import Link from 'next/link';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import { useTranslations } from 'next-intl';
import QuickDonationModal from '@/components/ui/Modals/QuickDonationModal';
import Button from '@/components/ui/LandingPage/Button';
import { getUserFromLocalStorage } from '@/utils/auth';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import DonateModal from '../Modals/DonateModal';

const StickeyBar = () => {
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const t = useTranslations('toolTips');
	const user = getUserFromLocalStorage();
	const data = useSelector<RootState, any>((state) => state.landingpage);

	const [quickDonationOpen, setQuickDonationOpen] = useState(false);
	const [donateOpen, setDonateOpen] = useState(false);
	const cancelDonateButtonRef = useRef(null);
	const [amount, setAmount] = useState<number>(0);
	const cancelQuickDonationButtonRef = useRef(null);
	const [randomFamily, setRandomFamily] = useState<any>();

	useEffect(() => {
		if (data?.randomFamilies) {
			setRandomFamily(data?.randomFamilies[0]);
		}
	}, [data?.randomFamilies]);

	return (
		<>
			<div className="fixed flex flex-col left-0 top-1/2 transform -translate-y-1/2 z-50">
				<Link
					href={'#'}
					className=" bg-[#BB9B6C] md:p-5 p-[10px] tooltip"
					onClick={() => {
						toast.error(`This feature is in progress`, {
							toastId: 'success',
							position: 'top-right',
							autoClose: 4000,
						});
					}}
				>
					<Image
						src={stickeySvg1}
						alt="stickeySvg1"
						className=" md:w-auto w-[14px]"
					/>
					<span className="tooltiptext">{t('familyRegister')}</span>
				</Link>
				<Link
					// href={url(PATHS.FAMILY)}
					href="#"
					onClick={() => {
						setQuickDonationOpen(true);
					}}
					className=" bg-[#CF7475] md:p-5 p-[10px] tooltip"
				>
					<Image
						src={stickeySvg2}
						alt="stickeySvg2"
						className=" md:w-auto w-[14px]"
					/>
					<span className="tooltiptext">{t('donateShare')}</span>
				</Link>
				<Link
					href={url(PATHS.BECOME_SPONSOR)}
					className=" bg-[#8DAE8E] md:p-5 p-[10px] tooltip"
				>
					<Image
						src={stickeySvg3}
						alt="stickeySvg3"
						className=" md:w-auto w-[14px]"
					/>
					<span className="tooltiptext">{t('becomeSponser')}</span>
				</Link>
			</div>
			<QuickDonationModal
				open={quickDonationOpen}
				setOpen={setQuickDonationOpen}
				cancelButtonRef={cancelQuickDonationButtonRef}
				amount={amount}
				setAmount={setAmount}
				setDonate={setDonateOpen}
			/>
			<DonateModal
				setOpen={setDonateOpen}
				open={donateOpen}
				cancelButtonRef={cancelDonateButtonRef}
				amount={amount}
				setAmount={setAmount}
				familyId={randomFamily && randomFamily?._id}
				isAddToCart={false}
			/>
		</>
	);
};

export default StickeyBar;
