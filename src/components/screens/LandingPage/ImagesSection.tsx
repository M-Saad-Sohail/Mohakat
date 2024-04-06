import React from 'react';
import Image from 'next/image';
import img1 from '@/assests/images/landing-page/IMG-1.jpg';
import img2 from '@/assests/images/landing-page/IMG-2.jpg';
import img3 from '@/assests/images/landing-page/IMG-3.jpg';
import img4 from '@/assests/images/landing-page/IMG-4.jpg';
import img5 from '@/assests/images/landing-page/IMG-5.jpg';
import img6 from '@/assests/images/landing-page/IMG-6.jpg';
import img7 from '@/assests/images/landing-page/IMG-7.jpg';

const ImagesSection = () => {
	return (
		<section className=" md:w-[80%] w-[90%] flex md:gap-4 gap-2 md:h-[90vh] h-[320px] md:my-12 mt-6 mb-12 mx-auto">
			<div className=" flex-1 grid grid-rows-5 md:gap-4 gap-2 h-full">
				<div className=" row-span-2">
					<Image
						src={img1}
						alt="img1"
						className=" h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
				<div className=" row-span-3">
					<Image
						src={img2}
						alt="img1"
						className=" h-full md:rounded-[20px] rounded-[16px] object-cover "
					/>
				</div>
			</div>
			<div className=" flex-1 grid grid-rows-5 md:gap-4 gap-2 h-full">
				<div className=" row-span-3">
					<Image
						src={img3}
						alt="img1"
						className=" h-full md:rounded-[20px] rounded-[16px] object-cover "
					/>
				</div>
				<div className=" row-span-2">
					<Image
						src={img4}
						alt="img1"
						className=" h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
			</div>
			<div className=" flex-1 grid grid-rows-7 md:gap-4 gap-2 h-full">
				<div className=" row-span-2">
					<Image
						src={img5}
						alt="img1"
						className=" h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
				<div className=" row-span-3">
					<Image
						src={img6}
						alt="img1"
						className=" h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
				<div className=" row-span-2">
					<Image
						src={img7}
						alt="img1"
						className=" h-full md:rounded-[20px] rounded-[16px] object-cover"
					/>
				</div>
			</div>
		</section>
	);
};

export default ImagesSection;
