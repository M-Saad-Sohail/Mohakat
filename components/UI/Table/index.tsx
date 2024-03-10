import React from 'react';
import { Column, useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { reject,approved } from './../../../assests';
import { ApprovedSponsor,RejectSponsor } from './../../../hooks/useSponsorTables';
import { getUserFromLocalStorage } from './../../../utils/auth';
import Image from 'next/image';
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
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleActionApprovedClick = (id: string) => {
     const user=getUserFromLocalStorage()
     ApprovedSponsor(user.key,id)
    console.log('Clicked action for row with ID:', id);
  };
  const handleActionRejectClick = (id: string) => {
    const user=getUserFromLocalStorage()
   RejectSponsor(user.key,id)
   console.log('Clicked action for row with ID:', id);
 };

  return (
    <>
      <table
        {...getTableProps()}
        className="font-helvetica mt-4 mb-4  sm:table-fixed w-full"
      >
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                /* eslint-disable */
                <th
                  {...column.getHeaderProps(column)}
                  className={
                    'border-table border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans mx-auto justify-center bg-primary'
                  }
                >
                  {column.render('Header')}
                </th>
                /* eslint-enable */
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              /* eslint-disable */
              <tr {...row.getRowProps()} className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
                {row.cells.map((cell: any) => {
                  if (cell.column.id === 'action') { // Check if the column is "action"
                    return (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center gap-x-7"
                      > 
                        <button onClick={() => handleActionRejectClick(row.orignal._id)}>
                            <Image src={reject} alt=''/>
                        </button>
                        <button onClick={() => handleActionApprovedClick(row.original._id)}>
                            <Image src={approved} alt=''/>
                        </button>
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        className="border border-[#ced4da] py-6 px-7 mobile:p-3 text-black font-sans font-normal text-base mobile:text-sm text-center"
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
