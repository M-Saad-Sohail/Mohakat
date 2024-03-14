import React, { useState } from "react";
import Modal from "react-modal";
import { close_icon } from "@/assests";
import Image from "next/image";
import { RejectDelete, RejectDeleteAll } from "@/hooks/useSponsorTables";
import { getUserFromLocalStorage } from '@/utils/auth';

interface IProp {
  openModal: boolean | undefined;
  isClose: () => void;
  id:string
  deleteAll:boolean
}
const DeleteModal = ({ openModal, isClose,id,deleteAll}: IProp) => {
  const [showTable, setShowTable] = useState(openModal);
  const handleDelete=()=>{
    const user = getUserFromLocalStorage();
		if (!user) return;
		RejectDelete(user.key, id);
        isClose()
		window.location.reload();

  }
  const handleDeleteAll=()=>{
    const user = getUserFromLocalStorage();
		if (!user) return;
		RejectDeleteAll(user.key);
       isClose()
		// window.location.reload();

  }
  return (
    <div className="text-black ">
      <Modal
        isOpen={openModal || false}
        onRequestClose={isClose} // Fixed the function call
        contentLabel="Chart Data Modal"
        style={{
          content: {
            height: "300px", // Set height to auto to fit content
            maxWidth: "550px", // Set max-width if necessary
            margin: "auto", 
            padding:0
          }
        }}
      >
        <div className="rounded-md overflow-hidden ">
        <div
            className="flex justify-between items-center bg-primary px-4"
          >
            <h1 className="text-xl font-bold my-4 text-white justify-center items-center flex uppercase">
              Delete Records
            </h1>
            <Image src={close_icon} alt="close" onClick={() => {
              setShowTable(false);
              isClose();
            }}/>
          </div>
         
          <h1 className="text-3xl font-bold my-4 text-[#001F12] justify-center items-center flex uppercase">
             Are you sure?
          </h1>
          <h4 className="text-base my-4 text-[#001F12] justify-center text-center items-center flex ">
            After deleting records you won’t be able to <br/> recover them.
          </h4>
          <div className="flex justify-center items-center gap-x-4 mt-4">
            <button className="py-3 px-14 border border-black rounded-md" onClick={isClose}>
              Cancel
            </button>
            <button className="py-3 px-10 shadow-custom border border-main bg-primary text-white rounded-md"  onClick={deleteAll ? handleDeleteAll : handleDelete}>
              Delete Records
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
