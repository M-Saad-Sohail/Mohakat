import React from 'react';
import { left_arrow, right_arrow } from '@/assests';
import Image from 'next/image';

interface IProps {
  pageIndex: number;
  previousPage: () => void;
  canPreviousPage: boolean;
  nextPage: () => void;
  canNextPage: boolean;
  pageCount: number; // Total number of pages
  goToPage: (pageIndex: number) => void; // Function to go to a specific page
}

function Pagination({ pageIndex, previousPage, canPreviousPage, nextPage, canNextPage, pageCount, goToPage }: IProps) {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <div
          key={i}
          className={`bg-blue px-2  rounded-md text-lg dark:bg-darkBlue text-black cursor-pointer ${i === pageIndex ? 'font-bold' : ''}`}
          onClick={() => goToPage(i)}
        >
          {i + 1}
        </div>
      );
    }
    return pages;
  };

  return (
    <div className="w-fit flex float-end">
      <button
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        <Image src={left_arrow} alt='left' className=''/>
      </button>
      {getPageNumbers()}
      <button
        onClick={nextPage}
        disabled={!canNextPage}
      >
        <Image src={right_arrow} alt='right'/>
      </button>
    </div>
  );
}

export default Pagination;
