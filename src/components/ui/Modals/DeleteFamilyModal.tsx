import React, { useState } from 'react';
import Modal from 'react-modal';
import { close_icon } from '@/assests';
import Image from 'next/image';
import { getUserFromLocalStorage } from '@/utils/auth';
import { DeleteFamily } from '@/hooks/useSponsorTables';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

interface DeleteFamilyModalProps {
	openModal: boolean | undefined;
	onClose: () => void;
	onDelete: () => void;
	id: string;
}
const DeleteFamilyModal = ({
	openModal,
	onClose,
	onDelete,
	id,
}: DeleteFamilyModalProps) => {
	const [showTable, setShowTable] = useState(openModal);
	const user = getUserFromLocalStorage();
	const t = useTranslations('DeleteFamily');

	const handleDelete = async (key: string, id: string) => {
		if (!user) return;
		try {
			await DeleteFamily(user.key, id);
			toast.success(`${t('family_deleted_successfully')}`, {
				toastId: 'delete-success',
				position: 'bottom-right',
				autoClose: 4000,
			});
			onClose();
		} catch {
			toast.error(`${t('deletion_failed')}`, {
				toastId: 'delete-error',
				position: 'bottom-right',
				autoClose: 4000,
			});
		}

	};

	return (
		<div className="text-black ">
			<Modal
				isOpen={openModal || false}
				onRequestClose={onClose} // Fixed the function call
				contentLabel="Chart Data Modal"
				style={{
					content: {
						height: '300px', // Set height to auto to fit content
						maxWidth: '550px', // Set max-width if necessary
						margin: 'auto',
						padding: 0,
					},
				}}
			>
				<div className="overflow-hidden rounded-md ">
					<div className="flex items-center justify-between px-4 bg-primary">
						<h1 className="flex items-center justify-center my-4 text-xl font-bold text-white uppercase">
							Delete Family?
						</h1>
						<Image
							src={close_icon}
							alt="close"
							onClick={() => {
								setShowTable(false);
								onClose();
							}}
						/>
					</div>

					<h1 className="text-3xl font-bold my-4 text-[#001F12] justify-center items-center flex uppercase">
						Are you sure?
					</h1>
					<h4 className="text-base my-4 text-[#001F12] justify-center text-center items-center flex ">
						After deleting family you won’t be able to <br /> recover it.
					</h4>
					<div className="flex items-center justify-center mt-4 gap-x-4">
						<button
							className="py-3 border border-black rounded-md px-14"
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							className="px-10 py-3 text-white border rounded-md shadow-custom border-main bg-primary"
							onClick={() => {
								if (user) {
									handleDelete(user.key, id);
								} else {
									const user = getUserFromLocalStorage();
									if (user) {
										handleDelete(user.key, id);
									} else {
										// Handle the case where user is null
										console.error('User data not found.');
									}
								}
							}}
						>
							Delete Family
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DeleteFamilyModal;
