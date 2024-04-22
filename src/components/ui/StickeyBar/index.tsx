import Image from 'next/image';
import React, { useRef, useState } from 'react';
import stickeySvg1 from '@/assests/svgs/stickeybar/stickeybar-1.svg';
import stickeySvg2 from '@/assests/svgs/stickeybar/stickeybar-2.svg';
import stickeySvg3 from '@/assests/svgs/stickeybar/stickeybar-3.svg';
import Link from 'next/link';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import { useTranslations } from 'next-intl';
import QuickDonationModal from '@/components/ui/Modals/QuickDonationModal'
import Button from '@/components/ui/LandingPage/Button';
import { getUserFromLocalStorage } from '@/utils/auth';



const StickeyBar = () => {
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const t = useTranslations('toolTips');

	const [quickDonationOpen, setQuickDonationOpen] = useState(false);
	const cancelQuickDonationButtonRef = useRef(null);
	const user = getUserFromLocalStorage();

	return (
		<>
		<QuickDonationModal
				open={quickDonationOpen}
				setOpen={setQuickDonationOpen}
				cancelButtonRef={cancelQuickDonationButtonRef}
			/>
		
		{!user &&
		<div className="fixed flex flex-col left-0 top-1/2 transform -translate-y-1/2 z-50">
			<Link href={''} className=" bg-[#CF7475] md:p-5 p-[10px] tooltip">
				<Image
					src={stickeySvg1}
					alt="stickeySvg1"
					className=" md:w-auto w-[14px]"
				/>
				<span className="tooltiptext">{t('familyRegister')}</span>
			</Link>
			<Link
				href={url(PATHS.FAMILY)}
				className=" bg-[#E8C08A] md:p-5 p-[10px] tooltip"
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
		}
		</>
	);
};

export default StickeyBar;
