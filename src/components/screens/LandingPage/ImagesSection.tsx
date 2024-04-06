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
		<section className=" w-[80%] flex gap-4 h-[90vh] my-12 mx-auto">
			<div className=" flex-1 grid grid-rows-5 gap-4 h-full">
				<div className=" row-span-2">
					<Image src={img1} alt="img1" className=" h-full rounded-[20px] " />
				</div>
				<div className=" row-span-3">
					<Image src={img2} alt="img1" className=" h-full rounded-[20px] " />
				</div>
			</div>
			<div className=" flex-1 grid grid-rows-5 gap-4 h-full">
				<div className=" row-span-3">
					<Image src={img3} alt="img1" className=" h-full rounded-[20px] " />
				</div>
				<div className=" row-span-2">
					<Image src={img4} alt="img1" className=" h-full rounded-[20px] " />
				</div>
			</div>
			<div className=" flex-1 grid grid-rows-7 gap-4 h-full">
				<div className=" row-span-2">
					<Image src={img5} alt="img1" className=" h-full rounded-[20px] " />
				</div>
				<div className=" row-span-3">
					<Image src={img6} alt="img1" className=" h-full rounded-[20px] " />
				</div>
				<div className=" row-span-2">
					<Image src={img7} alt="img1" className=" h-full rounded-[20px] " />
				</div>
			</div>
		</section>
	);
};

export default ImagesSection;
