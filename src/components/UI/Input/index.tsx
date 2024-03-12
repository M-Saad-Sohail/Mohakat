import React from "react";
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean | undefined;
  title: string;
}

const Input: React.FC<IProps> = ({
  placeholder,
  onChange,
  error,
  type,
  style,
  className,
  value,
  name,
  readOnly,
  title,
}) => {
  return (
    <div className="mb-4 flex flex-col">
      <label className="font-bold text-[20px] text-primary">{title}</label>
      <input
        autoComplete="off"
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        readOnly={readOnly}
        id={name}
        type={type}
        value={value}
        className={`p-3 w-full focus:outline-none bg-[#E8E8E8] h-[60px] max-w-[700px] text-primary ${className}`}
        style={style}
      />
      {error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
    </div>
  );
};

export default Input;
