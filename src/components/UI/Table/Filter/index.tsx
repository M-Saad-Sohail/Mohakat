import React from 'react';
import { searching } from '@/assests';
import Image from 'next/image';

interface IProps {
  filter: any;
  setFilter: any;
}
function GlobalFilter({ filter, setFilter }: IProps) {
  return (
    <div className="relative rounded-md border  dark:border-white shadow-2xl dark:bg-darkinput dark:border-darkinput transition-all ease-in duration-150 w-full">
      <div className="flex justify-between items-center h-full px-4 md:py-0 bg-transparent gap-x-4 ">
        <Image src={searching} alt='search'className='w-8 h-8'/>
        <input
          className="bg-transparent font-sans font-base  text-black dark:text-white outline-none border-none  dark:bg-darkinput dark:border-darkinput dark:placeholder-[#D8D8D8] placeholder:text-black text-[20px] my-3 w-full"
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