import Button from '@/components/ui/LandingPage/Button';
import React from 'react';

const HeroSection = () => {
	return (
		<section className="w-[80%] h-[85vh] flex items-center mx-auto">
			<div className=" grid grid-cols-5 h-[90%] gap-3">
				<div className=" flex flex-col gap-3"></div>
				<div className=" col-span-3">
					<h1 className=" text-3xl text-[#171717] font-bold text-center ">
						Be a Hero for Gaza: Donate, Sponsor, and Change Lives!
					</h1>
					<p className=" text-xl font-medium text-center">
						Take action today and be the hero Gaza families desperately need –
						your support matters.
					</p>
					<div>
						<Button
							type="button"
							title="Become a sponser"
							className=" bg-[#CF7475]"
						/>
					</div>
				</div>
				<div className="bg-slate-600">3</div>
			</div>
		</section>
	);
};

export default HeroSection;
