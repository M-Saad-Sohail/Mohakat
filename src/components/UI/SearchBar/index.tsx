import Image from 'next/image';
import React from 'react';
import { search } from '@/assests';

const SearchBar = () => {
	return (
		<div className="border border-gray-300 bg-white rounded-[24px] py-3 px-3 flex gap-x-4">
			<Image src={search} alt="search" className="w-6 h-6" />
			<input
				type="text"
				placeholder="Search"
				className="text-primary bg-white placeholder:text-primary placeholder:font-semibold"
			/>
		</div>
	);
};

export default SearchBar;
