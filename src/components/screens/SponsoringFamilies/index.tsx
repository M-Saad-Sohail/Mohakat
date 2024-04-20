'use client';
import React, { useState, useEffect } from 'react';
import Table from '@/components/ui/Table';
import { APPROVEDCOLUMN, SPONSERFAMILIESCOLUMN } from '@/contants';
import { fetchApprovedData } from '@/hooks/useSponsorTables';
import useFetchSponsors from '@/hooks/useFetchSponsors';
import { getJsonWithToken } from '@/api/api.instances';
import { getUserFromLocalStorage } from '@/utils/auth';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// UTILS
import { CustomPagination } from '@/utils/CustomPagination';
import { SearchTable } from '@/utils/SearchTable';
import { IoTerminal } from 'react-icons/io5';
import { AnySrvRecord } from 'dns';
import { FaRegListAlt } from "react-icons/fa";

interface Row {
	_id: number;
	lossesInWar: string;
	areaOfCurrentResidence: string;
	numberOfMartyrInFamily: string;
}

const SponsoringFamilies = () => {
	const [data, setData] = useState<any>();
	const initialState = {
		pagination: { paginationModel: { pageSize: 25 } },
		rows: data,
	};
	const [rows, setRows] = React.useState<any[]>([]);

	const fetchSponserFamilies = async (sponserId: string, token: any) => {
		const response = await getJsonWithToken(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donated/${sponserId}/families`,
			token && token,
		);
		if (response.success) {
			// setData(res.families);
			// console.log(res);
			console.log(response.families);
			const familiesData = response?.families
				.filter((item: any) => {
					return item.family !== null && item.family;
				})
				.map((item: any) => ({
					...item.family,
					id: item.family._id, // Assign _id as id
				}));
			console.log('hhj', familiesData);
			setRows(familiesData);
		}
	};

	function calculateColumnWidth(columnName: keyof Row) {
		// Finding the maximum length of content in the specified column
		const maxLength = Math.max(
			...rows.map((row) => String(row[columnName]).length),
		);
		// Adding some extra padding for better readability
		return maxLength * 10; // Adjust this factor as needed
	}

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'Id',
			headerAlign: 'center',
			align: 'center',
			sortable: true,
			width: calculateColumnWidth('id' as any),
			disableColumnMenu: true,
		},
		{
			field: 'lossesInWar',
			headerName: 'Losses In War',
			headerAlign: 'center',
			width: 150,
			align: 'center',
			sortable: false,
			disableColumnMenu: true,
		},
		{
			field: 'areaOfCurrentResidence',
			headerName: 'Area Of Current Residence',
			width: 250,
			headerAlign: 'center',
			align: 'center',
			sortable: false,
			disableColumnMenu: true,
		},
		{
			field: 'numberOfMartyrInFamily',
			headerName: '# Of Martyr In Family',
			headerAlign: 'center',
			align: 'center',
			width: 200,
			sortable: false,
			disableColumnMenu: true,
		},
		{
			field: 'view',
			headerName: 'View',
			sortable: false,
			headerAlign: 'center',
			align: 'center',
			disableColumnMenu: true,
			renderCell: (params) => (
				<div className=' flex justify-center items-center text-center'>
					<FaRegListAlt
						// onClick={() => handleViewUserReport(params.row as Row)}
						className=" text-[18px] cursor-pointer"
					/>
				</div>
			),
		},
	];

	useEffect(() => {
		console.log(rows);
	}, [rows]);

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		console.log('user', userData);
		if (userData) {
			fetchSponserFamilies(userData.id, userData?.key);
		}
	}, []);

	return (
		<div
			style={{
				height: '80%',
				width: '100%',
				backgroundColor: '#fff',
				border: 'none',
				borderRadius: '10px',
				// overflowX:'scroll'
			}}
		>
			{rows ? (
				<DataGrid
					pagination
					sx={{
						border: 'none',
						'& .MuiDataGrid-columnHeaderTitle': {
							fontWeight: '600',
						},
						'& .MuiDataGrid-columnHeader': {
							fontSize: '14px',
						},
						'& .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus':
							{
								outline: 'none',
							},
						// SEARCH
						'& .MuiBox-root': {
							display: 'flex',
							position: 'absolute',
							right: 0,
							top: '-55px',
							background: 'white',
							borderRadius: '12px',
							fontSize: '14px',
							padding: '6px 12px',
							width: '244px',
						},
						'& .css-3be3ve-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter':
							{
								paddingBottom: '0px',
							},
						'& .css-68pk0f': {
							padding: '0px',
						},
						'& .MuiInput-underline:before, .css-1eed5fa-MuiInputBase-root-MuiInput-root::before, .css-1eed5fa-MuiInputBase-root-MuiInput-root::after, .css-jcincl::after':
							{
								borderBottom: 'none !important',
							},
						// PAGINATION
						'& .Mui-selected, .Mui-selected:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
							color: 'black !important',
						},
						'& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar': {
							paddingRight: '24px',
						},
						'& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
							display: 'none',
						},
						'& .css-194a1fa-MuiSelect-select-MuiInputBase-input.css-194a1fa-MuiSelect-select-MuiInputBase-input.css-194a1fa-MuiSelect-select-MuiInputBase-input':
							{
								paddingRight: '4px',
							},
						'& .css-194a1fa-MuiSelect-select-MuiInputBase-input ': {
							padding: '2px 4px !important',
							border: '1px solid',
							borderRadius: '6px',
							fontSize: '14px',
						},
					}}
					rows={rows}
					columns={columns}
					hideFooterPagination={false}
					initialState={initialState}
					slots={{ pagination: CustomPagination }}
				/>
			) : null}
		</div>
	);
};

export default SponsoringFamilies;
