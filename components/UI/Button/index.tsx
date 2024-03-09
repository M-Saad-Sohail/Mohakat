import Loader from "./../Loader";
import React from "react";
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
const Button: React.FC<IProps> = ({
  onClick = () => {},
  type = "button",
  title,
  isLoading = false,
  className,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={isLoading}
        type={type}
        className={`${
          isLoading
            ? "bg-disabled text-disabled flex items-center justify-center cursor-not-allowed"
            : "text-white bg-primary rounded-lg cursor-pointer shadow-lg"
        } font-bold py-3 px-4 w-full h-[65px] ${className}`}
      >
        {isLoading && <Loader />}
        {title}
      </button>
    </div>
  );
};

export default Button;