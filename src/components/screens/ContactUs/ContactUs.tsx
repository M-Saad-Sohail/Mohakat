import React from 'react';
import ContactForm from './ContactForm';
import Image from 'next/image';
import Email from '@/assests/icons/email_icon.svg';
import Phone from '@/assests/icons/phone_icon.svg';
import Location from '@/assests/icons/loc_icon.svg';

const ContactUs = () => {
	return (
		<section className={` md:w-[80%] py-12 w-[90%] mx-auto flex gap-8 `}>
			<div className=" flex flex-1 flex-col gap-5">
				<h2 className=" flex flex-col gap-4 text-5xl font-bold text-[#CF7475]">
					{' '}
					<span>Contact</span>
					<span>Information</span>
				</h2>
				<p className=" text-lg font-medium text-[#000000] w-[65%]">
					For any inquiries or assistance, please feel free to reach out to us.
				</p>
				<div className="flex flex-col gap-5">
					<div className=" flex gap-3 items-center">
						<Image src={Email} alt="" />
						<span className=" text-base font-medium text-[#000000]">Email</span>
					</div>

					<div className=" flex gap-3 items-center">
						<Image src={Phone} alt="" />
						<span className=" text-base font-medium text-[#000000]">Phone</span>
					</div>

					<div className=" flex gap-3 items-center">
						<Image src={Location} alt="" />
						<span className=" text-base font-medium text-[#000000]">
							Address
						</span>
					</div>
				</div>
			</div>
			<div className=" flex-1">
				<ContactForm />
			</div>
		</section>
	);
};

export default ContactUs;
