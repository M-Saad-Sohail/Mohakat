import Image from 'next/image';
import React from 'react';
import stickeySvg1 from '@/assests/svgs/stickeybar/stickeybar-1.svg';
import stickeySvg2 from '@/assests/svgs/stickeybar/stickeybar-2.svg';
import stickeySvg3 from '@/assests/svgs/stickeybar/stickeybar-3.svg';
import Link from 'next/link';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';

const StickeyBar = () => {
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	return (
		<div className="fixed flex flex-col left-0 top-1/2 transform -translate-y-1/2">
			<Link href={url(PATHS.FAMILY)} className=" bg-[#CF7475] md:p-5 p-[10px]">
				<Image
					src={stickeySvg1}
					alt="stickeySvg1"
					className=" md:w-auto w-[14px]"
				/>
			</Link>
			<Link href={''} className=" bg-[#E8C08A] md:p-5 p-[10px]">
				<Image
					src={stickeySvg2}
					alt="stickeySvg2"
					className=" md:w-auto w-[14px]"
				/>
			</Link>
			<Link
				href={url(PATHS.BECOME_SPONSOR)}
				className=" bg-[#8DAE8E] md:p-5 p-[10px]"
			>
				<Image
					src={stickeySvg3}
					alt="stickeySvg3"
					className=" md:w-auto w-[14px]"
				/>
			</Link>
		</div>
	);
};

export default StickeyBar;
