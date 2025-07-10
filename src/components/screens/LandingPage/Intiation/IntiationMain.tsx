import React, { useEffect, useState } from 'react';
import { getJson } from '@/api/api.instances';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLandingStateAction } from '@/state/landingpage';
import { RootState } from '@/state/store';
import { usePathname } from 'next/navigation';
import Heading from '@/components/ui/Heading/Heading';

interface InitiationDataType {
	heading: string;
	description: string;
}

const IntiationMain = ({ currentPath }: { currentPath: any }) => {
	const dispatch = useDispatch();
	const { url, dir, locale, changeLocale } = useLocaleRouter();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const [initiationData, setInitiationData] = useState<InitiationDataType>({
		heading: '',
		description: '',
	});

	const handleInitiationData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setInitiationData({
				heading: data?.heading?.inEnglish,
				description: data?.description?.inEnglish,
			});
		} else if (path === 'ar') {
			setInitiationData({
				heading: data?.heading?.inArabic,
				description: data?.description?.inArabic,
			});
		} else if (path === 'tr') {
			setInitiationData({
				heading: data?.heading?.inTurkish,
				description: data?.description?.inTurkish,
			});
		}
	};

	const fetchInitiationData = async () => {
		const res = await getJson(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-initiation`,
		);
		if (res.success) {
			handleInitiationData(currentPath, res.newPost[0]);
			dispatch(
				setIsLandingStateAction({
					key: 'initiationData',
					value: res.newPost[0],
				}),
			);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		try {
			if (data.initiationData) {
				handleInitiationData(currentPath, data.initiationData);
			} else {
				fetchInitiationData();
			}
		} catch (error) {
			console.log(error);
		}
	}, []);
	return (
		<>
			{/* <h2 className=" md:text-3xl text-2xl font-semibold animated-div">
				{initiationData.heading}
			</h2> */}
			<div className = "flex flex-col justify-center items-center">
					<Heading heading = {initiationData.heading} className = "main_heading-black" />
				</div>
			{/* <p className=" md:text-lg text-base font-light animated-div">
				{initiationData.description}
			</p> */}
		</>
	);
};

export default IntiationMain;
