import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// ICONS
import Logo from '@/assests/icons/mainlogo.png';
import Facebook from '@/assests/icons/fb.png';
import Twitter from '@/assests/icons/twitter.png';
import Linkedin from '@/assests/icons/linkedin.png';

const Footer = () => {
	return (
		<>
			<div className=" bg-[#F8F8F8] flex flex-col gap-8 px-20 py-10">
				{/* first div */}
				<div className=" flex justify-between items-center">
					{/* logo */}
					<div>
						<Image src={Logo} alt="logo" />
					</div>
					{/* links */}
					<div className=" flex gap-8">
						<Link href={''}>
							<h3 className=" text-sm font-medium">Home</h3>
						</Link>
						<Link href={''}>
							<h3 className=" text-sm font-medium">Families</h3>
						</Link>
						<Link href={''}>
							<h3 className=" text-sm font-medium">FAQs</h3>
						</Link>
						<Link href={''}>
							<h3 className=" text-sm font-medium">Contact</h3>
						</Link>
					</div>
					{/* social icons */}
					<div className=" flex gap-3">
						<Image src={Facebook} alt="fb_logo" />
						<Image src={Twitter} alt="twitter_logo" />
						<Image src={Linkedin} alt="link_logo" />
					</div>
				</div>

				{/* second (line) div */}
				<div>
					<hr className="h-[3px] bg-[#00000080] border-0" />
				</div>

				{/* third div */}
				<div className=" flex justify-center items-center gap-10">
					<h3 className=" text-sm font-normal">
						© 2024 Muakhet. All rights reserved.
					</h3>
					<Link href={''}>
						<h3 className=" text-sm font-normal">Privacy Policy</h3>
					</Link>
					<Link href={''}>
						<h3 className=" text-sm font-normal">Terms of Service</h3>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Footer;
