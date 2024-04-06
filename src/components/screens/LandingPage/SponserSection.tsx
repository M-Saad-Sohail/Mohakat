import Button from '@/components/ui/LandingPage/Button';
import Sponser1 from '@/assests/svgs/landing-sponser/sponser-svg-1.svg';
import Sponser2 from '@/assests/svgs/landing-sponser/sponser-svg-2.svg';
import Sponser3 from '@/assests/svgs/landing-sponser/sponser-svg-3.svg';
import Image from 'next/image';
import React from 'react';

const SponserSection = () => {
	return (
		<section className=" w-[80%] flex flex-col gap-20 py-14 mx-auto">
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
			<div className=" flex justify-between ">
				<div className=" flex-1 flex flex-col items-center gap-5">
					<Image src={Sponser1} alt="Sponser1" />
					<p className="text-lg font-light text-center">
						Look at the data available for families needing sponsorship in Gaza
						Strip
					</p>
				</div>
				<div className=" flex-1 flex flex-col items-center gap-5">
					<Image src={Sponser2} alt="Sponser2" />
					<p className="text-lg font-light text-center">
						Choose the family you wish to sponsor depending on the Region inside
						Gaza, Number of family members, or Family situation (and you will
						receive updated information of that family, if sponsored)
					</p>
				</div>
				<div className=" flex-1 flex flex-col items-center gap-5">
					<Image src={Sponser3} alt="Sponser3" />
					<p className="text-lg font-light text-center">
						Paying monthly sponsorship for the family by registering on the
						platform and completing the process. You can also contribute by a
						share to the initiative without registering on the platform.
					</p>
				</div>
			</div>
		</section>
	);
};

export default SponserSection;
