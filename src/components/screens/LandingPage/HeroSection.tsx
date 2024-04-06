import React from 'react';
import img1 from '@/assests/images/landing-page/IMG-1.jpg';
import img2 from '@/assests/images/landing-page/IMG-2.jpg';
import img3 from '@/assests/images/landing-page/IMG-3.jpg';
import img4 from '@/assests/images/landing-page/IMG-4.jpg';
import img5 from '@/assests/images/landing-page/IMG-5.jpg';
import img6 from '@/assests/images/landing-page/IMG-6.jpg';
import img7 from '@/assests/images/landing-page/IMG-7.jpg';
import Button from '@/components/ui/LandingPage/Button';
import Image from 'next/image';

const images = [img1, img2, img3, img4, img5, img6, img7];

const HeroSection = () => {
	return (
		<section className="md:w-[80%] w-full h-[85vh] flex items-center mx-auto">
			<div className=" hidden md:grid grid-cols-5 h-[90%] gap-3">
				<div className=" flex flex-col justify-end gap-3">
					<div className=" h-[50%]">
						<Image src={img1} alt="img1" className=" h-full rounded-[20px] " />
					</div>
					<div className=" h-[30%]">
						<Image src={img2} alt="img1" className=" h-full rounded-[20px] " />
					</div>
				</div>
				<div className=" col-span-3 flex flex-col justify-between">
					<h1 className=" text-3xl text-[#171717] font-bold text-center ">
						Be a Hero for Gaza: Donate, Sponsor, and Change Lives!
					</h1>
					<p className="text-lg font-light text-center">
						Take action today and be the hero Gaza families desperately need –
						your support matters.
					</p>
					<div className=" flex flex-wrap gap-5 justify-center w-[80%] mx-auto">
						<Button title="Donate a Share" className=" bg-[#CF7475]" />
						<Button title="Become a Sponser" className=" bg-[#8DAE8E]" />
						<Button title="Register as Family" className=" bg-[#000000]" />
					</div>
					<div className=" h-[45%] flex gap-3">
						<div className="">
							<Image
								src={img1}
								alt="img1"
								className=" h-full rounded-[20px] "
							/>
						</div>
						<div className=" h-[80%] self-end">
							<Image
								src={img2}
								alt="img1"
								className=" h-full rounded-[20px] "
							/>
						</div>
						<div className="">
							<Image
								src={img2}
								alt="img1"
								className=" h-full rounded-[20px] "
							/>
						</div>
					</div>
				</div>
				<div className=" flex flex-col justify-end gap-3">
					<div className=" h-[50%]">
						<Image src={img1} alt="img1" className=" h-full rounded-[20px] " />
					</div>
					<div className=" h-[30%]">
						<Image src={img2} alt="img1" className=" h-full rounded-[20px] " />
					</div>
				</div>
			</div>
			<div className="md:hidden flex flex-col justify-end gap-10 h-full">
				<div className=" px-4 flex flex-col gap-4">
					<h1 className=" text-3xl leading-8 text-[#171717] font-bold text-center ">
						Be a Hero for Gaza: Donate, Sponsor, and Change Lives!
					</h1>
					<p className="text-base leading-6 font-normal text-center">
						Take action today and be the hero Gaza families desperately need –
						your support matters.
					</p>
					<div className=" flex flex-wrap gap-4 justify-center">
						<Button title="Donate a Share" className=" bg-[#CF7475]" />
						<Button title="Become a Sponser" className=" bg-[#8DAE8E]" />
						<Button title="Register as Family" className=" bg-[#000000]" />
					</div>
				</div>
				<div className="carousel-container h-[40%]">
					<div className="carousel h-full">
						{images.map((img, i) => (
							<div
								key={i}
								className="carousel-item flex even:items-end odd:items-start px-2"
							>
								<Image
									src={img}
									alt="Image 1"
									className="h-[90%] rounded-[20px]"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
