import React from 'react';
import Image from 'next/image';
import Sponser1 from '@/assests/images/landing-page/sponser1.png';
import Sponser2 from '@/assests/images/landing-page/sponser2.png';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PartnersSection = () => {
	const partners = [Sponser1, Sponser2, Sponser1, Sponser2, Sponser1];
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		speed: 5000,
		autoplaySpeed: 2000,
		cssEase: 'linear',
	};
	return (
		<>
			<section className=" w-[80%] mx-auto flex flex-col gap-8 py-12 ">
				<div>
					<h2 className=" text-3xl font-semibold">Our Partners</h2>
				</div>

				{/* partners card */}
				<div className=" flex gap-2">
					<Slider {...settings} className=" w-full">
						{partners.map((item, i) => {
							return (
								<div key={i} className="slide">
									<div className=" bg-[#FFFFFF] rounded-3xl p-10 w-[200px] h-[200px] shadow-md ring ring-gray-50 ring-opacity-40">
										<Image src={item} alt="" width={200} height={200} />
									</div>
								</div>
							);
						})}
					</Slider>
				</div>
			</section>
		</>
	);
};

export default PartnersSection;
