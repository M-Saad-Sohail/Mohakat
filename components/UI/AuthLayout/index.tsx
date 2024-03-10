import Image from "next/image";
import { signIn__image } from "./../../../assests"; // Corrected import path
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
      body.style.overflow = "hidden"; // Set body overflow to hidden
    }
  }, []);

  useEffect(() => {
    toggleBodyScrolling();
    return () => {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflow = "auto"; // Reset body overflow on component unmount
      }
    };
  }, [toggleBodyScrolling]);

  return (
    <div className="bg-main overflow-hidden"> {/* Set main screen overflow to hidden */}
      <div className="flex flex-col" style={{ overflowY: "auto" }}> {/* Allow vertical overflow for children */}
        <div className="flex-1 w-full flex md:flex-row gap-x-14">
          <div className={`${margin}`}>
            <Image
              src={signIn__image}
              alt="img"
              className={`w-full h-[97vh]`}
            />
          </div>
          <div className={`w-1/2 ${className}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
