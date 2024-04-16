import React, { useEffect, useState } from 'react';
import { getJson } from '@/api/api.instances';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { RootState } from '@/state/store';
import { setIsLandingStateAction } from '@/state/landingpage';

interface SponserDataType {
	heading: string;
	description: string;
}

const SponserMain = ({currentPath}:{currentPath:any}) => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const [sponserData, setSponserData] = useState<SponserDataType>({
		heading: '',
		description: '',
	});

	const handleSponserData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setSponserData({
				heading: data?.heading?.inEnglish,
				description: data?.description?.inEnglish,
			});
		} else if (path === 'ar') {
			setSponserData({
				heading: data?.heading?.inArabic,
				description: data?.description?.inArabic,
			});
		} else if (path === 'tr') {
			setSponserData({
				heading: data?.heading?.inTurkish,
				description: data?.description?.inTurkish,
			});
		}
	};
	const fetchActions = () => {
		(async () => {
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-action`,
			);
			if (res.success) {
				handleSponserData(currentPath, res.newPost[0]);
				dispatch(
					setIsLandingStateAction({
						key: 'newPost',
						value: res.newPost[0],
					}),
				);
			}
		})();
	};

	useEffect(() => {
		if (data.newPost) {
			handleSponserData(currentPath, data.newPost);
		} else {
			fetchActions();
		}
	}, []);

	return (
		<>
			<h2 className=" md:text-3xl text-2xl font-semibold">
				{sponserData?.heading}
			</h2>
			<p className=" md:text-lg text-base font-light">
				{sponserData?.description}
			</p>
		</>
	);
};

export default SponserMain;
