import React from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { reject, approved ,delete_icon} from './../../../assests';
import {
	ApprovedSponsor,
	RejectSponsor,
} from './../../../hooks/useSponsorTables';
import { getUserFromLocalStorage } from './../../../utils/auth';
import Image from 'next/image';
import GlobalFilter from './Filter';
import TableIcon from '../TableIcon';
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
	}: any = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter, // Ensure that useGlobalFilter is included here
	);
	const { globalFilter }: any = state;

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

	return (
		<>
			<div className="flex justify-between items-center mobile:flex-col-reverse">
				<div className="my-3 mr-2 w-full">
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
									<th key={column.id}
										{...column.getHeaderProps()}
										className={
											'border-table border py-4 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans mx-auto justify-center bg-primary'
										}
									>
										{column.Header === 'S.NO' || column.Header === 'Action' ? (
											<div className="flex items-center justify-center">
												<TableIcon show={false} /> {/* Your icon component */}
												<p className="ml-2">{column.render('Header')}</p>
											</div>
										) : (
											<div className="flex items-center justify-center">
												<TableIcon show={true} src={column.Header} /> {/* Your icon component */}
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
					{rows.map((row: any,index:Number) => {
						prepareRow(row);
						return (
							/* eslint-disable */
							<tr
								{...row.getRowProps()}
								key={row.id}
								className="  dark:odd:bg-darkChat"
							>
			{row.cells.map((cell: any, cellIndex: number) => {
				console.log('cell', cell)
                  if (cell.column.id === 'action') {

                    return (
                        <td
                            key={cell.id}
                            {...cell.getCellProps()}
                            className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center gap-x-7"
                        >
                            <button
                                onClick={() => handleActionRejectClick((row.original as any)._id)}
                            >
                                <Image src={reject} alt="" />
                            </button>
                            <button
                                onClick={() => handleActionApprovedClick((row.original as any)._id)}
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
                                onClick={() => handleActionApprovedClick((row.original as any)._id)}
                            >
                                <Image src={delete_icon} alt="" />
                            </button>
                        </td>
                    );
					
                } 
				 else if (cell.column.id === 'no') {
                    return (
                        <td
                            key={cell.id}
                            {...cell.getCellProps()}
                            className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center gap-x-7"
                        >
                            {cell.row.index+1}
                        </td>
                    );
                } else {
					console.log('row.original', row.original)
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
		</>
	);
}

export default Table;
