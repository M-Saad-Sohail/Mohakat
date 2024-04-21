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

interface Row {
	_id: number;
	lossesInWar: string;
	areaOfCurrentResidence: string;
	numberOfMartyrInFamily: string;
}

const SponsoringFamilies = () => {
	const [data, setData] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean | string>('');
	const initialState = {
		pagination: { paginationModel: { pageSize: 8 } },
		rows: data,
	};
	const [rows, setRows] = React.useState<any[]>([]);
	const [currentFamilyInfo, setCurrentFamilyInfo] = useState<any>(null);
	const [open, setOpen] = useState(false);
	const [familiesData, setFamiliesData] = useState<any>();
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const cancelButtonRef = useRef(null);

	const fetchSponserFamilies = async (sponserId: string, token: any) => {
		setIsLoading(true);
		const response = await getJsonWithToken(
			`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donated/${sponserId}/families`,
			token && token,
		);
		if (response.success) {
			const familiesData = response?.families
				.filter((item: any) => {
					return item.family !== null && item.family && item.amount;
				})
				.map((item: any) => ({
					...item.family,
					id: item.family._id,
					amount: item.amount,
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
			headerName: 'No. Of Martyr In Family',
			headerAlign: 'center',
			align: 'center',
			width: 200,
			sortable: false,
			disableColumnMenu: true,
		},
		{
			field: 'amount',
			headerName: 'Amount Donated',
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
				<div className=" flex justify-center items-center p-[13px]">
					<FaRegListAlt
						onClick={() => {
							setOpen(true);
							handleFamiliesData(currentPath, params.row as any);
						}}
						className=" text-[18px] cursor-pointer"
					/>
				</div>
			),
		},
	];

	const handleFamiliesData = (path: string | undefined, data: any) => {
		if (path === 'en') {
			setFamiliesData({
				...data,
				breadWinnerName: data?.breadWinnerName?.inEnglish,
				description: data?.description?.inEnglish,
				familyMemberDetail: data?.familyMemberDetail.map((member: any) => ({
					...member,
					memberName: member?.memberName.inEnglish,
				})),
			});
		} else if (path === 'ar') {
			setFamiliesData({
				...data,
				breadWinnerName: data?.breadWinnerName?.inArabic,
				description: data?.description?.inArabic,
				familyMemberDetail: data?.familyMemberDetail.map((member: any) => ({
					...member,
					memberName: member?.memberName.inArabic,
				})),
			});
		} else if (path === 'tr') {
			setFamiliesData({
				...data,
				breadWinnerName: data?.breadWinnerName?.inTurkish,
				description: data?.description?.inTurkish,
				familyMemberDetail: data?.familyMemberDetail.map((member: any) => ({
					...member,
					memberName: member?.memberName.inTurkish,
				})),
			});
		}
	};

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			fetchSponserFamilies(userData.id, userData?.key);
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
								'& .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
									background: '#742430 !important',
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
			<FamilyModal
				setOpen={setOpen}
				open={open}
				isTableView={true}
				cancelButtonRef={cancelButtonRef}
				amount={familiesData && (familiesData?.amount as any)}
				familyInfo={familiesData && familiesData}
			/>
		</>
	);
};

export default SponsoringFamilies;
