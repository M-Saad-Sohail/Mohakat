'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getJson } from '@/api/api.instances';
import { setIsLandingStateAction } from '@/state/landingpage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { usePathname } from 'next/navigation';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import Heading from '@/components/ui/Heading/Heading';
import DOMPurify from 'dompurify'; // For Saafetly Rendering HTML from the db
interface FaqDataType {
	questions: string;
	answers: string;
}

const FAQS = () => {
	const t = useTranslations('FAQ');
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const [faqData, setFaqData] = useState<FaqDataType[]>([]);

	// Function to sanitize HTML content
	const sanitizeHTML = (data) => {
		return { __html: DOMPurify.sanitize(data) };
	};

	const handleFaqData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setFaqData((prev: any) => [
				...prev,
				{
					questions: data?.questions?.inEnglish,
					answers: data?.answers?.inEnglish,
				},
			]);
		} else if (path === 'ar') {
			setFaqData((prev: any) => [
				...prev,
				{
					questions: data?.questions?.inArabic,
					answers: data?.answers?.inArabic,
				},
			]);
		} else if (path === 'tr') {
			setFaqData((prev: any) => [
				...prev,
				{
					questions: data?.questions?.inTurkish,
					answers: data?.answers?.inTurkish,
				},
			]);
		}
	};

	const fetchFaq = async () => {
		const res = await getJson(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-faqs`,
		);
		if (res.success) {
			setFaqData([]);
			res.newFaq.map((item: any) => handleFaqData(currentPath, item));
			dispatch(
				setIsLandingStateAction({
					key: 'newFaq',
					value: res.newFaq,
				}),
			);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		try {
			if (data.newFaq) {
				setFaqData([]);
				data.newFaq.map((item: any) => handleFaqData(currentPath, item));
			} else {
				fetchFaq();
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<section
			dir={dir}
			className={` md:w-[80%] py-12 w-[90%] mx-auto flex flex-col gap-8 `}
		>
			<div className=" flex flex-col gap-2">
				<div className="flex flex-col justify-start items-start">
					<Heading heading={t('title')} className="main_heading-black" />
				</div>
				<p className="md:text-lg text-base font-light text-[#36454F]">{t('description')}</p>
			</div>

			{/* faqs */}

			<div className=" flex flex-col gap-3 animated-div">
				{faqData.map((item, i) => {
					return (
						<>
							<div key={i} className=" flex gap-2 feature-shadow-faq ">
								<div key={i} className=" flex flex-col gap-2">
									<h3 className=" text-lg font-bold text-[#BB9B6C]">Q:</h3>
									<h3 className="text-lg font-bold text-[#36454F]">A:</h3>
								</div>
								<div className=" flex flex-col gap-2">
									<h3 className=" text-lg font-bold text-[#BB9B6C]">
										{item.questions}
									</h3>
									<h3 className=" text-lg font-normal text-[#36454F]"
										dangerouslySetInnerHTML={sanitizeHTML(item.answers)} />
								</div>
							</div>
						</>
					);
				})}
			</div>
		</section>
	);
};

export default FAQS;
