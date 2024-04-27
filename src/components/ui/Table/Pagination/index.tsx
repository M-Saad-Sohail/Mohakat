import React from 'react';
import { left_arrow, right_arrow } from '@/assests';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface IProps {
	pageIndex: number;
	previousPage: () => void;
	canPreviousPage: boolean;
	nextPage: () => void;
	canNextPage: boolean;
	pageCount: number; // Total number of pages
	goToPage: (pageIndex: number) => void;
	pageSize: number;
	dataCount: number; // Function to go to a specific page
}

function Pagination({
	pageIndex,
	previousPage,
	canPreviousPage,
	nextPage,
	canNextPage,
	pageCount,
	goToPage,
	pageSize,
	dataCount,
}: IProps) {
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
				</div>,
			);
		}
		return pages;
	};

	const t = useTranslations('Pagination');
	const { locale } = useLocale();
	console.log('🚀 ~ locale:', locale);
	let pathName = usePathname();
	console.log('🚀 ~ pathName:', pathName);

	return (
		<div className="w-full flex justify-between">
			<p className="text-[15px] text-black">
				{`${t('showing')}`} {pageIndex * pageSize + dataCount}/
				{pageCount * pageSize}
			</p>
			<div className="w-fit flex">
				<button onClick={previousPage} disabled={!canPreviousPage}>
					<Image src={left_arrow} alt="left" className="" />
				</button>
				{getPageNumbers()}
				<button onClick={nextPage} disabled={!canNextPage}>
					<Image src={right_arrow} alt="right" />
				</button>
			</div>
		</div>
	);
}

export default Pagination;
