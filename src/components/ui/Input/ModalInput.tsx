import React from 'react';

const ModalInput = ({
	label,
	type,
	placeholder,
	name,
	value,
	disabled,
	dir,
	onChange,
}: any) => {
	return (
		<>
			<div className=" flex flex-col gap-2" dir={dir}>
				<h3 dir={dir} className=" flex text-sm font-semibold text-[#000000]">{label}</h3>
				<input
					dir={dir}
					onChange={onChange}
					name={name}
					disabled={disabled}
					value={value}
					className="py-3 px-4 rounded-md bg-[#F8F8F8] w-full focus:outline-none"
					type={type}
					placeholder={placeholder}
				/>
			</div>
		</>
	);
};

export default ModalInput;
