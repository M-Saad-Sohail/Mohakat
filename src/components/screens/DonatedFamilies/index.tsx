'use client';
import React, { useState, useEffect, useRef } from 'react';
import { getJsonWithToken } from '@/api/api.instances';
import { getUserFromLocalStorage } from '@/utils/auth';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// UTILS
import { CustomPagination } from '@/utils/CustomPagination';
import { FaRegListAlt } from 'react-icons/fa';
import Loader from '@/components/ui/Loader';
import FamilyModal from '@/components/ui/Modals/FamilyModal';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface Row {
	_id: number;
	lossesInWar: string;
	areaOfCurrentResidence: string;
	numberOfMartyrInFamily: string;
}

const DonatedFamilies = () => {
	const [data, setData] = useState<any>();
	const t = useTranslations("DonatedFamilies")
	const [isLoading, setIsLoading] = useState<boolean | string>('');
	const initialState = {
		pagination: { paginationModel: { pageSize: 50 } },
		rows: data,
	};
	const [rows, setRows] = React.useState<any[]>([]);
	const [currentFamilyInfo, setCurrentFamilyInfo] = useState<any>(null);
	const [open, setOpen] = useState(false);
	const [familiesData, setFamiliesData] = useState<any>();
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const cancelButtonRef = useRef(null);

	const fetchDonatedFamilies = async (token: any) => {
		setIsLoading(true);
		const response = await getJsonWithToken(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donated/families`,
			token && token,
		);
		if (response.success) {
			const familiesData = response?.donations.map((item: any) => ({
				...item,
				id: item._id,
			}));
			setRows(familiesData);
			setIsLoading(false);
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
			field: 'sponsor',
			headerName: t('sponserId'),
			headerAlign: 'center',
			align: 'center',
			sortable: false,
			width: calculateColumnWidth('sponsor' as any),
			disableColumnMenu: true,
		},
		{
			field: 'family',
			headerName: t('familyId'),
			headerAlign: 'center',
			align: 'center',
			sortable: false,
			width: calculateColumnWidth('family' as any),
			disableColumnMenu: true,
		},
		{
			field: 'amount',
			headerName: t('amountDonated'),
			headerAlign: 'center',
			align: 'center',
			width: 200,
			sortable: true,
			disableColumnMenu: true,
		},
	];

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			fetchDonatedFamilies(userData?.key);
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center text-center">
					<Loader />
				</div>
			) : (
				<div
					style={{
						height: '80vh',
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
								'& .css-yrdy0g-MuiDataGrid-columnHeaderRow .css-k008qs': {
									background: 'rgba(116, 36, 48, 1) !important',
								},
								'& .MuiDataGrid-container--top [role=row]': {
									background: 'rgba(116, 36, 48, 1) !important',
								},
								'& .MuiDataGrid-columnHeaderTitle': {
									fontWeight: '600',
									color: 'white !important',
								},
								'& .MuiDataGrid-columnHeader': {
									fontSize: '14px',
								},
								'& .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus':
									{
										outline: 'none',
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
								'& .MuiDataGrid-sortIcon ': {
									color: 'white',
								},
								'& .css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root:hover ': {
									background: 'none',
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
			)}
		</>
	);
};

export default DonatedFamilies;
