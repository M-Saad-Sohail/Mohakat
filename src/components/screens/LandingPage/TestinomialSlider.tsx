import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { usePathname } from 'next/navigation';
import { getJson } from '@/api/api.instances';
import { setIsLandingStateAction } from '@/state/landingpage';
import useLocaleRouter from '@/hooks/useLocaleRouter';

interface Testimonial {
	name: string;
	destination: string;
	description: string;
}

const TestimonialSlider = () => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, any>((state) => state.landingpage);
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);
	const { url, dir, locale, changeLocale } = useLocaleRouter();

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
		<section
			dir={dir}
			className={`${pathname?.slice(1) === currentPath ? 'md:w-[80%] w-[90%]' : 'w-full'} mx-auto flex flex-col gap-2`}
		>
			<Slider {...settings} className=" h-full">
				{testimonialData.map((testimonial, index) => (
					<div  dir={dir} key={index} style={{ margin: ' 20px' }}>
						<Card
							sx={{ maxWidth: 'fit-content', padding: '0 8px' }}
							className=" flex items-start bg-[#FFFFFF] rounded-3xl p-10 shadow-md ring ring-gray-50 ring-opacity-40 mx-2 min-h-[222px] my-2 hover:bg-[#f8f8f8]"
						>
							<CardContent
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: '4px',
								}}
							>
								<Typography
									variant="h5"
									component="div"
									sx={{ color: '#802434' }}
								>
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
						</Card>
					</div>
				))}
			</Slider>
		</section>
	);
};

export default TestimonialSlider;
