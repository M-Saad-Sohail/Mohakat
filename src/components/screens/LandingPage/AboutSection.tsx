import React from 'react';

const AboutSection = () => {
	return (
		<div className="md:w-[80%] w-[90%] mx-auto mt-14 mb-10 grid md:grid-cols-2 grid-cols-1 gap-3">
			<div className=" flex flex-col gap-5 bg-[#E8C08A] rounded-[20px] py-8 md:px-7 px-6 custom-box-shadow">
				<h3 className="md:text-3xl text-2xl font-semibold">Who We Are?</h3>
				<p className="md:text-2xl text-lg font-light">
					“Moakhat” is a global initiative launched by civil society
					organizations and social activists to support our people in the Gaza
					Strip morally and financially.
				</p>
			</div>
			<div className=" flex flex-col gap-3">
				<div className="flex flex-col gap-[6px] bg-[#8DAE8E] rounded-[20px] p-6 custom-box-shadow">
					<h3 className="md:text-xl text-lg font-semibold">Financially</h3>
					<p className="md:text-base text-sm font-light">
						Financially, through the sponsorship by an individual, institution,
						or a family from outside Palestine to a family from inside Palestine
					</p>
				</div>
				<div className="flex flex-col gap-[6px] bg-[#CF7475] rounded-[20px] p-6 custom-box-shadow">
					<h3 className="md:text-xl text-lg font-semibold">Morally</h3>
					<p className="md:text-base text-sm font-light">
						Morally, through encouraging communication among families from
						outside and inside Gaza with each other, directly or indirectly, to
						raise their morale, support them, and stabilize them in our land,
						the land of Palestine.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutSection;
