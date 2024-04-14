'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getJson } from '@/api/api.instances';
import { setIsLandingStateAction } from '@/state/landingpage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { usePathname } from 'next/navigation';
import useLocaleRouter from '@/hooks/useLocaleRouter';

const FAQS = () => {
	const t = useTranslations('FAQ');
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const [faqData, setFaqData] = useState<any[]>([]);

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
			console.log(res.newFaq);
			
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

	useEffect(() => {
		console.log(faqData);
	}, [faqData]);

	return (
		<section
		dir={dir}
			className={` md:w-[80%] py-12 w-[90%] mx-auto flex flex-col gap-8 `}
		>
			<div className=" flex flex-col gap-2">
				<h2 className=" md:text-3xl text-2xl font-semibold">{t('title')}</h2>
				<p className="md:text-lg text-base font-light">{t('description')}</p>
			</div>

			{/* faqs */}

			<div className=" flex flex-col gap-3">
				{faqData.map((item, i) => {
					return (
						<>
							<div key={i} className=" flex gap-2">
								<div key={i} className=" flex flex-col gap-2">
									<h3 className=" text-lg font-bold text-[#CF7475]">Q:</h3>
									<h3 className="text-lg font-bold text-[#000000]">A:</h3>
								</div>
								<div className=" flex flex-col gap-2">
									<h3 className=" text-lg font-bold text-[#CF7475]">
										{item.questions}
									</h3>
									<h3 className=" text-lg font-normal text-[#000000]">
										{item.answers}
									</h3>
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
