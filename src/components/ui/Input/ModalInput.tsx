import React from 'react';

const ModalInput = ({
	label,
	type,
	placeholder,
	name,
	value,
	disabled,
	onChange,
}: any) => {
	return (
		<>
			<div className=" flex flex-col gap-2">
				<h3 className=" text-sm font-semibold text-[#000000]">{label}</h3>
				<input
					onChange={onChange}
					name={name}
					disabled={disabled}
					value={value}
					className=" py-3 px-4 rounded-md bg-[#F8F8F8] w-full focus:outline-none"
					type={type}
					placeholder={placeholder}
				/>
			</div>
		</>
	);
};

export default ModalInput;
