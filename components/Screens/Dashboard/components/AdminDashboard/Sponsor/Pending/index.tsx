import React, { useState, useEffect } from "react";
import LeftSideBar from "../../../../../../UI/Sidebar";
import MainLayout from "../../../../../../UI/MainLayout";
import Table from "../../../../../../UI/Table";
import { PENDINGCOLUMN } from "./../../../../../../../contants";
import { fetchPendingData } from "./../../../../../../../hooks/useSponsorTables";
import { getUserFromLocalStorage } from "../../../../../../../utils/auth";

const PendingSponsor = () => {
  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getUserFromLocalStorage();
        const data = await fetchPendingData(user.key);
        setPendingData(data?.simplifiedSponsors || []); // Ensure data is an array or set default to empty array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex">
        <LeftSideBar />
        <MainLayout>
          <div className="px-4">
            <h2 className="text-primary text-4xl justify-center flex items-center my-4 font-bold">
              Pending Sponsors
            </h2>
            <Table data={pendingData} columns={PENDINGCOLUMN} />
          </div>
        </MainLayout>
      </div>
    </div>
  );
};

export default PendingSponsor;
