import React,{useState,useEffect} from 'react'
import LeftSideBar from '../../../../../../UI/Sidebar'
import MainLayout from '../../../../../../UI/MainLayout'
import Table from '../../../../../../UI/Table'
import { APPROVEDCOLUMN } from './../../../../../../../contants';
import { fetchApprovedData } from './../../../../../../../hooks/useSponsorTables';
import { getUserFromLocalStorage } from '../../../../../../../utils/auth';
const Approved = () => {
    const [approvedData, setApprovedData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const user = getUserFromLocalStorage();
          const data = await fetchApprovedData(user.key);
          setApprovedData(data?.simplifiedSponsors || []); // Ensure data is an array or set default to empty array
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [approvedData]);
  
  return (
    <div>
    <div className='flex'>
    <LeftSideBar/>
    <MainLayout>
        <div className='px-4'>
            <h2 className='text-primary text-4xl justify-center flex items-center my-4 font-bold'>Approved Sponsors</h2>
        <Table data={approvedData} columns={APPROVEDCOLUMN}/>
        </div>
 
    </MainLayout>
    </div>
    </div>
  )
}

export default Approved
