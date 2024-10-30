import { LogoEN, LogoAR, PreLoaderLogo } from '@/assests/index';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './PreLoader.css'; // Make sure to include your CSS for styling

const PreLoader  =  () => {
  const [text, setText] = useState(''); // State to hold the displayed text
  const websiteName = 'Islamic Cognizance'; // Website name

  useEffect(() => {
    let currentIndex = 0; // Index to track the current character

    // Interval to update the text
    const interval = setInterval(() => {
      if (currentIndex < websiteName.length) {
        setText((prev) => prev + websiteName[currentIndex]); // Append the current character
        currentIndex++; // Move to the next character
      } else {
        clearInterval(interval); // Clear interval when done
      }
    }, 150); // Adjust speed of letter appearance

    return () => clearInterval(interval); // Cleanup on unmount
  }, [websiteName]); // Dependency array ensures effect runs when websiteName changes

  // Render JSX
  return (
    <div id="preloader">
      <div id="loader">
        <Image 
          src= {LogoEN} // Replace with your logo path
          alt="Logo"
          className="logo" 
          width={150} // Adjust size as needed
          height={150} // Adjust size as needed
        />
      </div>
      <h1 className="md:text-[90px] text-[32px] md:leading-[96px] leading-[44px] text-[#000] font-bold text-center">
        {text}
      </h1>
    </div>
  );
};

export default PreLoader;