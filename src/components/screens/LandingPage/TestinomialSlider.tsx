import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { usePathname } from 'next/navigation';
import { getJson } from '@/api/api.instances';
import { setIsLandingStateAction } from '@/state/landingpage';

interface Testimonial {
	name: string;
	destination: string;
	description: string;
}

const TestimonialSlider = () => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1);
	const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);

	const handleTestimonialData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setTestimonialData((prev: any) => [
				...prev,
				{
					name: data?.name?.inEnglish,
					destination: data?.destination?.inEnglish,
					description: data?.description?.inEnglish,
				},
			]);
		} else if (path === 'ar') {
			setTestimonialData((prev: any) => [
				...prev,
				{
					name: data?.name?.inArabic,
					destination: data?.destination?.inArabic,
					description: data?.description?.inArabic,
				},
			]);
		} else if (path === 'tr') {
			setTestimonialData((prev: any) => [
				...prev,
				{
					name: data?.name?.inTurkish,
					destination: data?.destination?.inTurkish,
					description: data?.description?.inTurkish,
				},
			]);
		}
	};

	const fetchTesimonial = async () => {
		const res = await getJson(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-testimonial`,
		);
		if (res.success) {
			setTestimonialData([]);
			res.newTest.map((item: any) => handleTestimonialData(currentPath, item));
			dispatch(
				setIsLandingStateAction({
					key: 'testimonial',
					value: res.newTest,
				}),
			);
		}
	};

	useEffect(() => {
		try {
			if (data.newAbout) {
				setTestimonialData([]);
				data.testimonial.map((item: any) =>
					handleTestimonialData(currentPath, item),
				);
			} else {
				fetchTesimonial();
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3, // Number of cards to show in one row
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<section className="md:w-[80%] w-[90%] mx-auto flex flex-col gap-2 ">
			<Slider {...settings}>
				{testimonialData.map((testimonial, index) => (
					<div key={index} style={{ margin: '0 20px' }}>
						<Card
							sx={{ maxWidth: 'fit-content', minHeight: 150, padding: '0 8px' }}
							className=" bg-[#FFFFFF] rounded-3xl p-10 shadow-md ring ring-gray-50 ring-opacity-40"
						>
							<CardActionArea>
								<CardContent>
									<Typography variant="h5" component="div">
										{testimonial.name}
									</Typography>
									<Typography
										gutterBottom
										variant="caption"
										component="div"
										sx={{ fontStyle: 'italic' }}
									>
										{testimonial.destination}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{testimonial.description}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</div>
				))}
			</Slider>
		</section>
	);
};

export default TestimonialSlider;
