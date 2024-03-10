'use client'
import React, { useEffect, useState } from "react";
import { secondLogo,language,profile } from "../../../assests";
import { Links } from "../../../contants";
import Link from "next/link";
import Image from "next/image";
import { getUserFromLocalStorage } from "../../../utils/auth";
import SearchBar from "../SearchBar";

type IProps = {
  isLoggedIn: boolean;
};

const AppNavbar = () => {
    useEffect(()=>{
        getUserFromLocalStorage();
    },[])


  const [open, setOpen] = useState(false);
  const handleMenuClick = () => {
    setOpen(!open);
    toggleBodyScrolling();
  };
  const toggleBodyScrolling = () => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = open ? "auto" : "hidden";
    }
  };

  return (
    <div className="bg-primary h-fit shadow-md text-white">
      <div className="flex items-center justify-between py-4 mobile:pt-4">
        <div className="flex items-center">
          <Link href="/">
            <Image src={secondLogo} alt="Logo" className="mx-2 h-[70px] w-[70px] object-contain" />
          </Link>
        </div>
        <div className={`items-center gap-x-4 mr-7 flex`}>
          <SearchBar/>
          <Image
              src={language} // Replace with the path to the user profile image
              alt={""}
              className="h-10 w-10 rounded-full mr-2"
            />
          <div className="flex items-center">
            <Image
              src={profile} // Replace with the path to the user profile image
              alt={""}
              className="h-12 w-12 rounded-full mr-2"
            />
            <p className="">{ "name"}</p>
          </div>
        </div>
        <div
          onClick={handleMenuClick}
          className={ "text-xl md:hidden cursor-pointer ml-3"}
        >
          {/* You can add a menu icon here if needed */}
        </div>
      </div>
    </div>
  );
};

export default AppNavbar
