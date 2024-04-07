import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImg from '@/assests/images/landing-page/light-gray-background.png';
import { getJson } from '@/api/api.instances';

const ImagesSection = () => {
	const [imagesData, setImagesData] = useState<any>();

	useEffect(() => {
		(async () => {
			const res = await getJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-landing-img`,
			);
			if (res.success) {
				setImagesData(res.landingPageSlider);
			}
		})();
	}, []);

	return (
		<section className=" md:w-[80%] w-[90%] flex md:gap-4 gap-2 md:h-[90vh] h-[320px] md:my-12 mt-6 mb-12 mx-auto">
			<div className=" flex-1 grid grid-rows-5 md:gap-4 gap-2 h-full">
				<div className=" row-span-2">
					<Image
						src={(imagesData && imagesData[0].landingPageImg) || defaultImg}
						alt="img"
						width={100}
						height={100}
						className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
				<div className=" row-span-3">
					<Image
						src={(imagesData && imagesData[1].landingPageImg) || defaultImg}
						alt="img"
						width={100}
						height={100}
						className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover "
					/>
				</div>
			</div>
			<div className=" flex-1 grid grid-rows-5 md:gap-4 gap-2 h-full">
				<div className=" row-span-3">
					<Image
						src={(imagesData && imagesData[2].landingPageImg) || defaultImg}
						alt="img"
						width={100}
						height={100}
						className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover "
					/>
				</div>
				<div className=" row-span-2">
					<Image
						src={(imagesData && imagesData[3].landingPageImg) || defaultImg}
						alt="img"
						width={100}
						height={100}
						className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
			</div>
			<div className=" flex-1 grid grid-rows-7 md:gap-4 gap-2 h-full">
				<div className=" row-span-2">
					<Image
						src={(imagesData && imagesData[4].landingPageImg) || defaultImg}
						alt="img"
						width={100}
						height={100}
						className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
				<div className=" row-span-3">
					<Image
						src={(imagesData && imagesData[5].landingPageImg) || defaultImg}
						alt="img"
						width={100}
						height={100}
						className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
				<div className=" row-span-2">
					<Image
						src={(imagesData && imagesData[6].landingPageImg) || defaultImg}
						alt="img"
						width={100}
						height={100}
						className=" w-full h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
			</div>
		</section>
	);
};

export default ImagesSection;
