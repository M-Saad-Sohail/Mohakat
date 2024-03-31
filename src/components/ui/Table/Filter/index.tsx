import React from 'react';
import { searching } from '@/assests';
import Image from 'next/image';

interface IProps {
	filter: any;
	setFilter: any;
}
function GlobalFilter({ filter, setFilter }: IProps) {
	return (
		<div className="relative bg-white rounded-lg shadow-2xl border-0 transition-all ease-in duration-150 w-full">
			<div className="flex justify-between bg-white items-center h-full px-4 md:py-0 bg-transparent gap-x-4 ">
				<Image src={searching} alt="search" className="w-4 h-4 text-stone-700" />
				<input
					className="bg-transparent font-sans font-base text-black outline-none border-none  placeholder:text-stone-700 text-[14px] my-3 w-full"
					type="text"
					placeholder="Search Here"
					value={filter || ''}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
		</div>
	);
}

export default GlobalFilter;
