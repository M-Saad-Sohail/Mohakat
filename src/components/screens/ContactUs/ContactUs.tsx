'use client';
import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import Image from 'next/image';
import Email from '@/assests/icons/email_icon.svg';
import Phone from '@/assests/icons/phone_icon.svg';
import Location from '@/assests/icons/loc_icon.svg';
import { setIsLandingStateAction } from '@/state/landingpage';
import { getJson } from '@/api/api.instances';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import EarthSvg from '@/assests/images/landing-page/earth.svg';
import Link from 'next/link';
import Heading from '@/components/ui/Heading/Heading';

interface ContactDataType {
	heading: string;
	shortDescription: string;
	address: string;
	email: string;
	phoneNumber: string;
}

const ContactUs = () => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const [contactData, setContactData] = useState<ContactDataType>();

	const handleContactData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setContactData({
				heading: data?.heading?.inEnglish,
				shortDescription: data?.shortDescription?.inEnglish,
				address: data?.address?.inEnglish,
				email: data?.email,
				phoneNumber: data?.phoneNumber,
			});
		} else if (path === 'ar') {
			setContactData({
				heading: data?.heading?.inArabic,
				shortDescription: data?.shortDescription?.inArabic,
				address: data?.address?.inArabic,
				email: data?.email,
				phoneNumber: data?.phoneNumber,
			});
		} else if (path === 'tr') {
			setContactData({
				heading: data?.heading?.inTurkish,
				shortDescription: data?.shortDescription?.inTurkish,
				address: data?.address?.inTurkish,
				email: data?.email,
				phoneNumber: data?.phoneNumber,
			});
		}
	};

	const fetchContactData = async () => {
		const res = await getJson(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-contact-info`,
		);
		if (res.success) {
			handleContactData(currentPath, res.newContactInformation[0]);
			dispatch(
				setIsLandingStateAction({
					key: 'newContactInformation',
					value: res.newContactInformation[0],
				}),
			);
		}
	};
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		try {
			if (data.newContactInformation) {
				handleContactData(currentPath, data.newContactInformation);
			} else {
				fetchContactData();
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<section
			dir={dir}
			className={` md:w-[80%] py-12 w-[90%] mx-auto flex flex-wrap gap-8 animated-div`}
		>
			<div className=" flex flex-1 flex-col gap-8">
				{contactData && (
					<>
						<div className = "flex flex-col justify-start items-start">
							<Heading heading = {contactData?.heading} className = "main_heading-black" />
						</div>
						<p className=" text-lg font-medium text-[#36454F] w-[65%]">
							{contactData?.shortDescription}
						</p>
						<div className="flex flex-col gap-5">
							<div className=" flex gap-3 items-center">
								<Image src={Email} alt="" />
								<span className=" text-base font-medium text-[#36454F]">
									{contactData?.email}
								</span>
							</div>

							<div className=" flex gap-3 items-center">
								<Image src={Phone} alt="" />
								<span className=" text-base font-medium text-[#36454F]">
									{contactData?.phoneNumber}
								</span>
							</div>

							<div className=" flex gap-3 items-center">
								<Image src={EarthSvg} alt="" />
								<span className=" text-base font-medium text-[#36454F]">
									<Link href={contactData?.address} target='_blank'>
									{contactData?.address}
									</Link>
								</span>
							</div>
						</div>
					</>
				)}
			</div>
			<div className=" flex-1">
				<ContactForm />
			</div>
		</section>
	);
};

export default ContactUs;
