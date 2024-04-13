import React from 'react';

const data = [
	{
		que: 'How can I donate?',
		ans: "To donate, simply click on the 'Donate Now' button on our website and follow the instructions provided. Your contribution will go directly towards supporting the families in Palestine and Gaza.",
	},
	{
		que: 'Where do funds go?',
		ans: 'All funds raised through our platform are used to provide essential resources such as food, clean water, medical aid, and shelter to the families in need in Palestine and Gaza.',
	},
	{
		que: 'How can I become a sponsor?',
		ans: "To become a sponsor, click on the 'Sponsor Now' button on our website. You can choose to sponsor a specific family or make a general sponsorship donation to support multiple families.",
	},
	{
		que: 'Can I donate anonymously?',
		ans: 'Yes, you can choose to donate anonymously. Simply indicate your preference during the donation process, and your personal information will be kept confidential.',
	},
	{
		que: 'How can I get involved?',
		ans: 'There are many ways to get involved. You can volunteer your time, organize fundraising events, or spread awareness about the situation in Palestine and Gaza through social media.',
	},
];

const FAQS = () => {
	return (
		<section
			className={` md:w-[80%] py-12 w-[90%] mx-auto flex flex-col gap-8 `}
		>
			<div className=" flex flex-col gap-2">
				<h2 className=" md:text-3xl text-2xl font-semibold">FAQs</h2>
				<p className="md:text-lg text-base font-light">
					Find answers to common questions about the donation process, where
					funds go, and how to become a sponsor.
				</p>
			</div>

			{/* faqs */}

			<div className=" flex flex-col gap-3">
				{data.map((item, i) => {
					return (
						<>
							<div className=" flex gap-2">
								<div key={i} className=" flex flex-col gap-2">
									<h3 className=" text-lg font-bold text-[#CF7475]">Q:</h3>
									<h3 className="text-lg font-bold text-[#000000]">A:</h3>
								</div>
								<div className=" flex flex-col gap-2">
									<h3 className=" text-lg font-bold text-[#CF7475]">
										{item.que}
									</h3>
									<h3 className=" text-lg font-normal text-[#000000]">
										{item.ans}
									</h3>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</section>
	);
};

export default FAQS;
