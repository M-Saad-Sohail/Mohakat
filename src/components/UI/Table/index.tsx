import React, { useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { reject, approved, delete_icon } from '@/assests';
import {
	ApprovedSponsor,
	RejectSponsor,
	RejectDeleteAll,
} from './../../../hooks/useSponsorTables';
import {
	getLastNameFromPathname,
	getUserFromLocalStorage,
} from './../../../utils/auth';
import Image from 'next/image';
import GlobalFilter from './Filter';
import TableIcon from '../TableIcon';
import DeleteModal from '@/components/Screens/Dashboard/components/AdminDashboard/Sponsor/Rejected/component';
import Button from '../Button';
import Pagination from './Pagination';
import { usePathname } from 'next/navigation';

interface IProps {
	data: any;
	columns: any;
}

function Table({ columns, data }: IProps) {
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

	const handleActionApprovedClick = (id: string) => {
		const user = getUserFromLocalStorage();
		if (!user) return;
		ApprovedSponsor(user.key, id);
		window.location.reload();
	};
	const handleActionRejectClick = (id: string) => {
		const user = getUserFromLocalStorage();
		if (!user) return;
		RejectSponsor(user.key, id);
		window.location.reload();
	};
	const handleActionRejectDeleteAll = () => {
		const user = getUserFromLocalStorage();
		if (!user) return;
		RejectDeleteAll(user.key);
		window.location.reload();
	};
	const [openModal, setOpenModal] = useState(false);
	const [deleteId, setDeleteId] = useState('');
	const handleModal = () => {
		setOpenModal(false);
		setDeleteOpenModal(false);
	};
	const [openDeleteModal, setDeleteOpenModal] = useState(false);
	const [id, setId] = useState('');

	const pathName = window.location.pathname;
	const value = getLastNameFromPathname(pathName);
	const rejected = value === 'rejected' ? true : false;

	// Calculate pageCount based on rows.length and pageSize
	const calculatedPageCount = Math.ceil(rows.length / pageSize);

	return (
		<>
			{/* Your existing code for DeleteModal and other components */}
			<div className="flex justify-between items-center mobile:flex-col-reverse">
				<div className="my-3 mr-2 w-full flex gap-x-4">
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
					{rejected && (
						<div
							className="gap-x-4 min-w-[180px] flex text-white bg-primary  cursor-pointer rounded-md shadow-custom border-main font-bold py-3 px-4  h-[65px] justify-center items-center"
							onClick={() => {
								setDeleteOpenModal(true);
							}}
						>
							<Image
								src={delete_icon}
								alt="alt"
								style={{ filter: 'invert(100%)' }}
								className="w-6 h-6"
							/>
							<button className="text-base">Delete All</button>
						</div>
					)}
				</div>
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
								console.log('column', column.Header); // Log the column object
								return (
									<th
										key={column.id}
										{...column.getHeaderProps()}
										className={`border-table border py-4 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans mx-auto justify-center bg-primary ${
											column.Header === 'S.NO' || column.Header === 'Action'
												? 'w-[10%]' // Set narrower width for S.NO and Action columns
												: column.Header === 'Email'
													? 'w-[30%]' // Set wider width for Email column
													: 'w-auto' // Set default width for other columns
										}`}
									>
										{column.Header === 'S.NO' || column.Header === 'Action' ? (
											<div className="flex items-center justify-center ">
												<TableIcon show={false} /> {/* Your icon component */}
												<p className="ml-2">{column.render('Header')}</p>
											</div>
										) : (
											<div className="flex items-center justify-center">
												<TableIcon show={true} src={column.Header} />{' '}
												{/* Your icon component */}
												<p className="ml-2">{column.render('Header')}</p>
											</div>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row: any, index: Number) => {
						prepareRow(row);
						return (
							<tr
								{...row.getRowProps()}
								key={row.id}
								className="  dark:odd:bg-darkChat"
							>
								{row.cells.map((cell: any, cellIndex: number) => {
									console.log('cell', cell);
									if (cell.column.id === 'action') {
										return (
											<td
												key={cell.id}
												{...cell.getCellProps()}
												className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center gap-x-7"
											>
												<button
													onClick={() =>
														handleActionRejectClick((row.original as any)._id)
													}
												>
													<Image src={reject} alt="" />
												</button>
												<button
													onClick={() =>
														handleActionApprovedClick((row.original as any)._id)
													}
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
												className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center gap-x-7"
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
												className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center gap-x-7"
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
												className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center gap-x-7"
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
			</table>
			{rows.length !== 0 && (
				<Pagination
					canNextPage={canNextPage}
					pageIndex={pageIndex}
					canPreviousPage={canPreviousPage}
					previousPage={previousPage}
					nextPage={nextPage}
					goToPage={gotoPage}
					pageCount={calculatedPageCount} // Pass pageCount here
				/>
			)}
		</>
	);
}

export default Table;
