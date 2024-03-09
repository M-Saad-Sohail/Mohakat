import React from 'react';
import { hero__image } from './../../../../../assests';
import Button from './../../../../UI/Button';
import Image from 'next/image';


const HeroSection = () => {
  const handleButtonClick = () => {
    console.log('123456')
    // return <Navigate to="/become-sponsor" />;
  };
  return (
    <div className='w-full h-full flex justify-center gap-x-16 items-center'>
      <div className='w-[40%] px-[54px]'>
        <h1 className='text-primary text-[52px] font-bold'>Supporting Palestine and Gaza: Together for a Better Future</h1>
        <p className='text-[18px] my-4'>Become a sponsor and make a difference for the families of Palestine and Gaza. Your contribution can bring hope and change lives.</p>
        <Button title='Become a sponsor' className='max-w-[200px]' onClick={handleButtonClick} />
      </div>
      <div>
        <Image alt='hero-image' src={hero__image} style={{ maxWidth: '100%' }} className="h-screen" />
      </div>
    </div>
  );
};

export default HeroSection;