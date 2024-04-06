import Button from '@/components/ui/LandingPage/Button';
import React from 'react';

const SponserSection = () => {
	return (
		<section className=" w-[80%] mx-auto">
			<div className=" flex flex-col gap-4">
				<h2 className=" text-3xl font-semibold">
					How can you become a sponsor?
				</h2>
				<p className=" text-lg font-light">
					Lorem ipsum dolor sit amet consectetur. Faucibus turpis sed nisl in.
					Lacus mi vel arcu sed lacus sed lacus. Erat convallis sed suscipit
					tortor urna bibendum vivamus sit. Morbi proin commodo imperdiet
					ullamcorper quam cum elit.
				</p>
				<div className=" flex gap-4">
					<Button title="Donate a Share" className=" bg-[#CF7475]" />
					<Button title="Become a Sponser" className=" bg-[#8DAE8E]" />
					<Button title="Register as Family" className=" bg-[#000000]" />
				</div>
			</div>
			<div></div>
		</section>
	);
};

export default SponserSection;
