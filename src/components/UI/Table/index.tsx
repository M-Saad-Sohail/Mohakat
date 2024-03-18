'use client';
import React, { useState } from 'react';
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

interface IProps {
	data: any;
	columns: any;
	search?: boolean;
	setData?: any;
}

function Table({ columns, data, search, setData }: IProps) {
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
			columns,
			data,
		},
		useGlobalFilter,
		usePagination,
	);
	const { globalFilter, pageSize, pageIndex }: any = state;
	const { replace } = useLocaleRouter();
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

	const pathName = window.location.pathname;
	const value = getLastNameFromPathname(pathName);
	const rejected = value === 'rejected' ? true : false;

	// Calculate pageCount based on rows.length and pageSize
	const calculatedPageCount = Math.ceil(rows.length / pageSize);

	return (
		<>
			{/* Your existing code for DeleteModal and other components */}
			<div className="flex justify-between items-center">
				{search && (
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				)}
				{rejected && (
					<div
						className="gap-x-2 min-w-[150px] ml-2 flex text-white bg-primary  cursor-pointer rounded-md shadow-custom border-main font-bold py-3 px-2  h-[45px] justify-center items-center"
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
						<button className="text-[14px]">Delete All</button>
					</div>
				)}
			</div>
			<table
				{...getTableProps()}
				className="font-helvetica mt-4 mb-4  sm:table-fixed w-full"
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
										key={column.id}
										{...column.getHeaderProps()}
										className={`py-3 px-7 mobile:px-3 mobile:py-2 text-[15px] mobile:text-sm text-white font-medium font-sans bg-primary ${
											column.Header === 'S.NO' || column.Header === 'Action'
												? 'w-[10%]' // Set narrower width for S.NO and Action columns
												: column.Header === 'Email'
													? 'w-[30%]' // Set wider width for Email column
													: 'w-auto' // Set default width for other columns
										}`}
									>
										{column.Header === 'S.NO' || column.Header === 'Action' ? (
											<div className="flex">
												<TableIcon show={false} /> {/* Your icon component */}
												<div className="ml-2">{column.render('Header')}</div>
											</div>
										) : (
											<div className="flex">
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
										console.log('cell', cell);
										if (cell.column.id === 'action') {
											return (
												<td
													key={cell.id}
													{...cell.getCellProps()}
													className="py-3 px-7 mobile:p-3  text-black font-sans font-normal text-base mobile:text-sm text-center"
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
													key={cell.id}
													{...cell.getCellProps()}
													className="py-3 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center gap-x-7"
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
													className="py-3 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center gap-x-7"
												>
													{cell.row.index + 1}
												</td>
											);
										} else {
											console.log('row.original', row.original);
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
								className="text-center text-primary font-bold"
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
