'use client'
import Image from "next/image";
import { signIn__image } from "../../../assests";
import { useCallback, useEffect } from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  margin?: string;
}

const AuthLayout: React.FC<IProps> = ({ children, className, margin }) => {
  const toggleBodyScrolling = useCallback(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.color = "bg-main";
    }
  }, []);

  useEffect(() => {
    toggleBodyScrolling();
  }, [toggleBodyScrolling]);

  return (
    <div className="bg-main overflow-y-hidden">
      <div className="flex flex-col" style={{ overflow: "hidden" }}>
        <div className="flex-1 w-full flex md:flex-row gap-x-14">
          <div className={`w-1/2 ${margin}`}>
            <Image
              src={signIn__image}
              alt="img"
              className={`w-full h-fit object-cover`}
             
            />
          </div>
          <div className={`w-1/2 ${className}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
