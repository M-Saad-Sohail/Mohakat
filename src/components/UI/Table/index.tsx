'use client';
import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { reject, approved, delete_icon } from '@/assests';
import NoData from '../NoData';
import {
	ApprovedSponsor,
	RejectSponsor,
	RejectDeleteAll,
} from '@/hooks/useSponsorTables';
import { getLastNameFromPathname, getUserFromLocalStorage } from '@/utils/auth';
import Image from 'next/image';
import GlobalFilter from './Filter';
import TableIcon from '../TableIcon';
import DeleteModal from '@/components/Screens/Dashboard/components/AdminDashboard/Sponsor/Rejected/component';
import Button from '../Button';
import Pagination from './Pagination';
import { usePathname } from 'next/navigation';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useTranslations } from 'next-intl';

interface IProps {
	data: any;
	columns: any;
	search?: boolean;
	setData?: any;
}

function Table({ columns, data, search, setData }: IProps) {
	const t = useTranslations();

	const tableColumns = useMemo(() => {
		return columns.map((col: any) => ({
			...col,
			Header: t(`Table.Header.${col.Header}`),
		}));
	}, [t, columns]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		setGlobalFilter,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageCount,
		page,
		gotoPage,
	}: any = useTable(
		{
			columns: tableColumns,
			data,
		},
		useGlobalFilter,
		usePagination,
	);
	const { globalFilter, pageSize, pageIndex }: any = state;
	const { replace, dir } = useLocaleRouter();

	const handleActionApprovedClick = async (id: string) => {
		const user = getUserFromLocalStorage();
		if (!user) return;
		await ApprovedSponsor(user.key, id);
		replace('/dashboard/sponsor/approved');
	};

	const handleActionRejectClick = async (id: string) => {
		const user = getUserFromLocalStorage();
		if (!user) return;
		await RejectSponsor(user.key, id);
		replace('/dashboard/sponsor/rejected');
	};

	const [deleteId, setDeleteId] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [deleteAll, setDeleteAll] = useState(false);
	const [id, setId] = useState('');

	const pathName = usePathname();
	const value = getLastNameFromPathname(pathName ?? '');
	const rejected = value === 'rejected' ? true : false;

	// Calculate pageCount based on rows.length and pageSize
	const calculatedPageCount = Math.ceil(rows.length / pageSize);

	return (
		<>
			{/* Your existing code for DeleteModal and other components */}
			<div dir={dir} className="flex items-center justify-between gap-3">
				{search && (
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				)}
				{rejected && (
					<div
						dir={dir}
						className="gap-x-2 min-w-[150px] flex text-white bg-primary  cursor-pointer rounded-md shadow-custom border-main font-bold py-3 px-2  h-[45px] justify-center items-center"
						onClick={() => {
							setDeleteAll(true);
							setOpenModal(true);
						}}
					>
						<Image
							src={delete_icon}
							alt="alt"
							style={{ filter: 'invert(100%)' }}
							className="w-4 h-4"
						/>
						<button className="text-[14px]">
							{t('RejectedSponsors.deleteAll')}
						</button>
					</div>
				)}
			</div>
			<table
				dir={dir}
				{...getTableProps()}
				className="w-full mt-4 mb-4 font-helvetica sm:table-fixed"
			>
				<thead>
					{headerGroups.map((headerGroup: any) => (
						<tr
							{...headerGroup.getHeaderGroupProps()}
							key={headerGroup.id}
							className=""
						>
							{headerGroup.headers.map((column: any) => {
								return (
									<th
										{...column.getHeaderProps()}
										className={`py-3 px-7 mobile:px-3 mobile:py-2 text-[15px] mobile:text-sm text-white font-medium font-sans bg-primary ${
											column.Header === t('Table.Header.Sno') ||
											column.Header === t('Table.Header.Action')
												? 'w-[10%]' // Set narrower width for S.NO and Action columns
												: column.Header === t('Table.Header.Email')
													? 'w-[30%]' // Set wider width for Email column
													: 'w-auto' // Set default width for other columns
										}`}
										key={column.id}
									>
										{column.Header === t('Table.Header.Sno') ||
										column.Header === t('Table.Header.Action') ? (
											<div className="flex gap-x-2">
												<TableIcon show={false} /> {/* Your icon component */}
												<div className="ml-2">{column.render('Header')}</div>
											</div>
										) : (
											<div className="flex gap-x-2">
												<TableIcon show={true} src={column.Header} />{' '}
												{/* Your icon component */}
												<div className="ml-2">{column.render('Header')}</div>
											</div>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				{data.length > 0 ? (
					<tbody {...getTableBodyProps()} className="bg-white">
						{page.map((row: any, index: Number) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={row.id}>
									{row.cells.map((cell: any, cellIndex: number) => {
										if (cell.column.id === 'action') {
											return (
												<td
													{...cell.getCellProps()}
													key={cell.id}
													className="py-3 font-sans text-base font-normal text-center text-black px-7 mobile:p-3 mobile:text-sm"
												>
													<button
														onClick={() =>
															handleActionRejectClick((row.original as any)._id)
														}
														className="mx-[1px]"
													>
														<Image src={reject} alt="" />
													</button>
													<button
														onClick={() =>
															handleActionApprovedClick(
																(row.original as any)._id,
															)
														}
														className="mx-[1px]"
													>
														<Image src={approved} alt="" />
													</button>
												</td>
											);
										}
										if (cell.column.id === 'delete') {
											return (
												<td
													{...cell.getCellProps()}
													key={cell.id}
													className="py-3 font-sans text-base font-normal text-center text-black px-7 mobile:p-3 mobile:text-sm gap-x-7"
												>
													<button
														onClick={() => {
															setDeleteId(row.original._id);
															setOpenModal(true);
														}}
													>
														<Image src={delete_icon} alt="" />
													</button>
												</td>
											);
										} else if (cell.column.id === 'no') {
											return (
												<td
													key={cell.id}
													{...cell.getCellProps()}
													className="py-3 font-sans text-base font-normal text-center text-black px-7 mobile:p-3 mobile:text-sm gap-x-7"
												>
													{cell.row.index + 1}
												</td>
											);
										} else {
											return (
												<td
													key={cell.id}
													{...cell.getCellProps()}
													className="py-3 px-7 mobile:p-3 text-black font-sans font-normal text-[14px] text-start"
												>
													{cell.render('Cell')}
												</td>
											);
										}
									})}
								</tr>
							);
						})}
					</tbody>
				) : (
					<tbody className="w-full h-full">
						{/* show a no data row */}
						<tr className="h-full">
							<td
								colSpan={columns.length}
								key={'no data'}
								className="font-bold text-center text-primary"
							>
								<NoData />
							</td>
						</tr>
					</tbody>
				)}
			</table>
			{rows.length !== 0 && (
				<Pagination
					canNextPage={canNextPage}
					pageIndex={pageIndex}
					canPreviousPage={canPreviousPage}
					previousPage={previousPage}
					nextPage={nextPage}
					pageSize={pageSize}
					goToPage={gotoPage}
					dataCount={rows.length}
					pageCount={calculatedPageCount} // Pass pageCount here
				/>
			)}

			{/* Modal */}
			<DeleteModal
				openModal={openModal}
				id={deleteId}
				onClose={() => {
					setOpenModal(false);
				}}
				deleteAll={deleteAll}
				resetData={() => {
					if (!setData) return;

					if (deleteAll) {
						setData([]);
						setDeleteAll(false);
					} else {
						const updatedData = data.filter(
							(item: any) => item._id !== deleteId,
						);
						setData(updatedData);
					}
				}}
			/>
		</>
	);
}

export default Table;
