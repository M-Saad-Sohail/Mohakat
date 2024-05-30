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

const FamilySponsorData = () => {
  const [data, setData] = useState<any>();
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
  const t1 = useTranslations('Sponsoring');

  const fetchSponserFamilies = async (familyId: string, token: any) => {
    let familyIdCounter = 1; // Initialize the counter
    const userData = getUserFromLocalStorage();
    setIsLoading(true);
    const response = await getJsonWithToken(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donated/${familyId}/sponsors`,
      token && token
    );
    if (response?.length === 0) {
      setRows([])
      setIsLoading(false);
    }
    else {
      const sponsorData = response?.donations?.map((item: any) => ({
          id: familyIdCounter++,
          username: item?.name,
          city: item?.city
        }));
      setRows(sponsorData);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: `S.NO`,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: 'username',
      headerName: `${t1('sponsorname')}`,
      headerAlign: 'center',
      width: 150,
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'city',
      headerName: `${t1('sponsorcity')}`,
      width: 250,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
    },
    // {
    //   field: 'amount',
    //   headerName: `${t1('sponsoramount')}`,
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 230,
    //   sortable: true,
    //   disableColumnMenu: true,
    // },
  ];

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
                '& .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus': {
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
                '& .css-194a1fa-MuiSelect-select-MuiInputBase-input.css-194a1fa-MuiSelect-select-MuiInputBase-input.css-194a1fa-MuiSelect-select-MuiInputBase-input': {
                  paddingRight: '4px',
                },
                '& .css-194a1fa-MuiSelect-select-MuiInputBase-input': {
                  padding: '2px 4px !important',
                  border: '1px solid',
                  borderRadius: '6px',
                  fontSize: '14px',
                },
                '& .MuiDataGrid-sortIcon': {
                  color: 'white',
                },
                '& .css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root:hover': {
                  background: 'none',
                },
              }}
              rows={rows}
              columns={columns}
              hideFooterPagination={false}
              initialState={initialState}
              slots={{ pagination: CustomPagination }}
            />
          ) : <div className="text-center text-[30px]">{t1("nodonation")}</div>}
        </div>
      )}
    </>
  );
};

export default FamilySponsorData;

