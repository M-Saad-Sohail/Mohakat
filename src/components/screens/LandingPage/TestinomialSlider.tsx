import React from 'react';
import Slider from 'react-slick';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const TestimonialSlider = ({ testimonials }) => {
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
    <section className = 'md:w-[80%] w-[90%] mx-auto flex flex-col gap-2 '>
    <Slider {...settings}>
      {testimonials.map((testimonial, index) => (
        <div key={index} style={{ margin: '0 20px' }}>
          <Card sx={{ maxWidth: 'fit-content', minHeight: 150, padding: '0 8px', }} className=" bg-[#FFFFFF] rounded-3xl p-10 shadow-md ring ring-gray-50 ring-opacity-40">
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" component="div">
                  {testimonial.name}
                </Typography>
                <Typography gutterBottom variant="caption" component="div" sx={{ fontStyle: 'italic' }}>
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
