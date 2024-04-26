import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { close_icon } from '@/assests';
import Image from 'next/image';
import Input from '@/components/ui//Input';
import { fetchFamiliesData } from '@/hooks/useSponsorTables';
import { useFormik } from 'formik';
import { UpdateFamilyValues } from '@/contants';
import { UpdateFamilySchema } from '@/utils/validationSchema';
import { putJson } from '@/api/api.instances';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import Select from '../Select';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import DeleteFamilyModal from './DeleteFamilyModal';
import Button from '@/components/ui/LandingPage/Button';
import { FamilyMember, ViewModalProps } from './interfaces';

const ViewModal = ({
	openModal,
	onClose,
	id,
	onTableRefresh,
}: ViewModalProps) => {
	const [deleteId, setDeleteId] = useState('');
	const [showTable, setShowTable] = useState(openModal);
	const [familyMembers, setFamilyMembers] = useState<any[]>([]);
	const { user } = useLoggedInUser();
	const [loading, setLoading] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const handleDeleteConfirmed = (id: string) => {
		setDeleteId(id);
		setOpenDeleteModal(true);
		// setShowTable(false);
		onClose();
	};

	const handleMemberDetailChange = (
		index: any,
		key: string,
		value: string | number,
	) => {
		const updatedMembers = [...familyMembers];
		if (!updatedMembers[index]) {
			updatedMembers[index] = {
				memberName: {
					inEnglish: '',
					inTurkish: '',
					inArabic: '',
				},
				memberAge: '',
				MemberIdNumber: '',
				memberGender: '',
			};
		}
		if (key.startsWith('in')) {
			updatedMembers[index].memberName[
				key as keyof FamilyMember['memberName']
			] = (value as string).toUpperCase(); // Convert to uppercase
		} else {
			updatedMembers[index][key as keyof FamilyMember] = value as
				| string
				| number;
		}
		setFamilyMembers(updatedMembers);
	};

	const t = useTranslations('AddFamilies.form');

	useEffect(() => {
		if (user) {
			fetchFamilyDetails(id)
				.then((familySponsor) => {
					console.log('Success');
				})
				.catch((error) => {
					console.error('Error fetching family details:', error);
				});
		}
	}, [id]);

	const UpdateFamilyForm = useFormik({
		initialValues: UpdateFamilyValues,
		validationSchema: UpdateFamilySchema,
		onSubmit: async ({ values }: any) => {
			const response = {
				breadWinnerName: {
					inEnglish: UpdateFamilyForm.values.breadWinnerNameEn,
					inTurkish: UpdateFamilyForm.values.breadWinnerNameTr,
					inArabic: UpdateFamilyForm.values.breadWinnerNameAr,
				},
				description: {
					inEnglish: UpdateFamilyForm.values.descriptionEn,
					inTurkish: UpdateFamilyForm.values.descriptionTr,
					inArabic: UpdateFamilyForm.values.descriptionAr,
				},
				maritalStatus: UpdateFamilyForm.values.maritalStatus,
				email: UpdateFamilyForm.values.email,
				language: UpdateFamilyForm.values.language,
				gender: UpdateFamilyForm.values.gender,
				age: UpdateFamilyForm.values.age,
				dateOfBirth: UpdateFamilyForm.values.dateOfBirth,
				areaOfPreviousResidence:
					UpdateFamilyForm.values.areaOfPreviousResidence,
				areaOfCurrentResidence: UpdateFamilyForm.values.areaOfCurrentResidence,
				numberOfFamilyMembers: parseInt(
					UpdateFamilyForm.values.numberOfFamilyMembers,
				),
				telephoneNumber: UpdateFamilyForm.values.telephoneNumber,
				idNumber: parseInt(UpdateFamilyForm.values.idNumber),
				lossesInWar: UpdateFamilyForm.values.lossesInWar,
				currentSituation: UpdateFamilyForm.values.currentSituation,
				numberOfMartyrInFamily: parseInt(
					UpdateFamilyForm.values.numberOfMartyrInFamily,
				),
				numberOfInfectedInFamily: parseInt(
					UpdateFamilyForm.values.numberOfInfectedInFamily,
				),
				familyMemberDetail: familyMembers,
			};
			try {
				setLoading(true);
				const res = await putJson(
					`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/update-family/${id}`,
					response,
					user?.key,
				);
				if (res.success) {
					setLoading(false);
					setShowTable(false);
					onClose();
					UpdateFamilyForm.resetForm();
					toast.success(`${t('submitForUpdate')}`, {
						toastId: 'success',
						position: 'bottom-right',
						autoClose: 4000,
					});
					onTableRefresh();
				}
			} catch (error) {
				// console.log(error);
				setLoading(false);
				toast.error(`${t('fill_form_correctly')}`, {
					toastId: 'error',
					position: 'bottom-right',
					autoClose: 4000,
				});
			}

			// console.log('form submitted', response);
		},
	});

	useEffect(() => {
		if (UpdateFamilyForm.values.numberOfFamilyMembers > familyMembers.length) {
			const newMembers = new Array(
				UpdateFamilyForm.values.numberOfFamilyMembers - familyMembers.length,
			).fill({
				memberName: { inEnglish: '', inArabic: '', inTurkish: '' },
				memberAge: '',
				MemberIdNumber: '',
				memberGender: '',
			});
			setFamilyMembers(familyMembers.concat(newMembers));
		}
	}, [UpdateFamilyForm.values.numberOfFamilyMembers]);

	const fetchFamilyDetails = async (id: string) => {
		if (!user) return;

		const familyData = await fetchFamiliesData(user.key);
		const family_Sponsor = familyData.familySponser.find(
			(sponsor: any) => sponsor._id === id,
		);
		// setFamilySponsor(family_Sponsor);
		// console.log('🚀 ~ fetchFamilyDetails ~ family_Sponsor:', family_Sponsor);
		// UpdateFamilyForm.setValues({email: family_Sponsor.email, breadWinnerNameTr: family_Sponsor?.breadWinnerName?.inTurkish})
		if (family_Sponsor) {
			UpdateFamilyForm.setValues({
				...family_Sponsor,
				breadWinnerNameEn: family_Sponsor?.breadWinnerName.inEnglish,
				breadWinnerNameAr: family_Sponsor?.breadWinnerName.inArabic,
				breadWinnerNameTr: family_Sponsor?.breadWinnerName.inTurkish,
				descriptionEn: family_Sponsor?.description.inEnglish,
				descriptionAr: family_Sponsor?.description.inArabic,
				descriptionTr: family_Sponsor?.description.inTurkish,
			});
			setFamilyMembers(family_Sponsor.familyMemberDetail);
		}
		return family_Sponsor;
	};

	return (
		<div className="text-black ">
			<Modal
				isOpen={openModal || false}
				onRequestClose={onClose}
				contentLabel="View Family Details"
				style={{
					content: {
						height: '600px',
						maxWidth: '90%',
						margin: 'auto',
						padding: 0,
					},
				}}
			>
				<div className="rounded-md">
					<div className="w-100 flex items-center justify-between px-4 bg-primary">
						<h1 className="flex items-center justify-center my-4 text-xl font-bold text-white uppercase">
							{`${t('formTitle')}`}
						</h1>
						<Image
							src={close_icon}
							alt="close"
							className="cursor-pointer"
							onClick={() => {
								setShowTable(false);
								onClose();
								UpdateFamilyForm.resetForm();
							}}
						/>
					</div>

					<div className="m-5 flex-col justify-center items-center">
						<div className=" w-full gap-x-4">
							<div className=" flex flex-col gap-3">
								<h3 className=" text-sm font-bold">{`${t('BreadWinnerName.title')} *`}</h3>
								<div className="flex items-start justify-start w-full gap-x-4">
									<div>
										<Input
											title={'In English *'}
											name="breadWinnerNameEn"
											className="mb-[19px] min-w-[300px]"
											value={UpdateFamilyForm.values.breadWinnerNameEn}
											onChange={UpdateFamilyForm.handleChange}
										/>
									</div>

									<div>
										<Input
											title={'In Turkish *'}
											name="breadWinnerNameTr"
											className="mb-[19px] min-w-[300px]"
											value={UpdateFamilyForm.values.breadWinnerNameTr}
											onChange={UpdateFamilyForm.handleChange}
										/>
									</div>
									<div>
										<Input
											title={'In Arabic *'}
											name="breadWinnerNameAr"
											className="mb-[19px] min-w-[300px]"
											value={UpdateFamilyForm.values.breadWinnerNameAr}
											onChange={UpdateFamilyForm.handleChange}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-start justify-start w-full gap-x-4">
							<div>
								<Input
									title={`${t('email.title')} *`}
									name="email"
									className="mb-[5px] min-w-[460px]"
									value={UpdateFamilyForm.values.email}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
							<div>
								<Input
									title={`${t('age.title')} *`}
									name="age"
									type="number"
									className="mb-[5px] min-w-[460px]"
									value={UpdateFamilyForm.values.age}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
						</div>

						<div className="flex items-start justify-start w-full gap-x-4">
							<div>
								<Input
									title={`${t('telephone.title')} *`}
									name="telephoneNumber"
									type="number"
									className="mb-[5px] min-w-[460px]"
									value={UpdateFamilyForm.values.telephoneNumber}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>

							<div>
								<Input
									title={`${t('id.title')} *`}
									name="idNumber"
									type="number"
									className="mb-[5px] min-w-[460px]"
									value={UpdateFamilyForm.values.idNumber}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
						</div>

						<div className="flex items-start justify-start w-full gap-x-4">
							<div>
								<Input
									title={`${t('dob.title')} *`}
									name="dateOfBirth"
									className="mb-[5px] min-w-[460px] "
									type="date"
									value={UpdateFamilyForm.values.dateOfBirth}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>

							<div>
								<Select
									title={`${t('gender.title')} *`}
									name="gender"
									options={[
										{ label: t('gender.male'), value: 'male' },
										{ label: t('gender.female'), value: 'female' },
									]}
									defaultValue={t('gender.default')}
									className="mb-[40px] min-w-[460px] mt-[2px] "
									value={UpdateFamilyForm.values.gender}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
						</div>

						<div className="flex items-start justify-start w-full mb-8 gap-x-4">
							<div>
								<Select
									title={`${t('martialstatus.title')} *`}
									name="maritalStatus"
									options={[
										{ label: t('martialstatus.single'), value: 'single' },
										{ label: t('martialstatus.married'), value: 'married' },
									]}
									className={` ${UpdateFamilyForm.errors.maritalStatus ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
									value={UpdateFamilyForm.values.maritalStatus}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>

							<div>
								<Select
									title={`${t('language.title')} *`}
									name="language"
									options={[
										{ label: t('language.english'), value: 'en' },
										{ label: t('language.arabic'), value: 'ar' },
										{ label: t('language.turkish'), value: 'tr' },
									]}
									defaultValue={t('language.default')}
									className={` ${UpdateFamilyForm.errors.language ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
									value={UpdateFamilyForm.values.language}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
						</div>

						<div className=" flex flex-col gap-3">
							<h3 className=" text-sm font-bold">{`${t('comment.title')} *`}</h3>
							<div className="flex items-start justify-start w-full gap-x-4">
								<Input
									title={'In English'}
									name="descriptionEn"
									className="mb-[10px] min-w-[300px]"
									value={UpdateFamilyForm.values.descriptionEn}
									onChange={UpdateFamilyForm.handleChange}
								/>
								<Input
									title={'In Turkish'}
									name="descriptionTr"
									className="mb-[10px] min-w-[300px]"
									value={UpdateFamilyForm.values.descriptionTr}
									onChange={UpdateFamilyForm.handleChange}
								/>
								<Input
									title={'In Arabic'}
									name="descriptionAr"
									className="mb-[10px] min-w-[300px]"
									value={UpdateFamilyForm.values.descriptionAr}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
						</div>

						<div className="flex items-start justify-start w-full mb-8 gap-x-4">
							<div>
								<Select
									title={`${t('previousresidence.title')} *`}
									name="areaOfPreviousResidence"
									options={[
										{ label: t('previousresidence.Gaza'), value: 'Gaza' },
										{
											label: t('previousresidence.JabaliaCamp'),
											value: 'Jabalia Camp',
										},
										{
											label: t('previousresidence.KhanYunis'),
											value: 'Khan Yunis',
										},
										{ label: t('previousresidence.Rafah'), value: 'Rafah' },
										{
											label: t('previousresidence.DeiralBalah'),
											value: 'Deir al-Balah',
										},
										{
											label: t('previousresidence.Beachrefugeecamp'),
											value: 'Beach refugee camp',
										},
										{
											label: t('previousresidence.NuseiratCamp'),
											value: 'Nuseirat Camp',
										},
										{
											label: t('previousresidence.MaghaziCamp'),
											value: 'Maghazi Camp',
										},
										{
											label: t('previousresidence.BureijCamp'),
											value: 'Bureij Camp',
										},
										{
											label: t('previousresidence.AlShatiCamp'),
											value: 'Al-Shati Camp',
										},
									]}
									defaultValue={t('previousresidence.default')}
									className={` ${UpdateFamilyForm.errors.areaOfPreviousResidence ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
									value={UpdateFamilyForm.values.previousresidence}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
							<div>
								<Select
									title={`${t('currentresidence.title')} *`}
									name="areaOfCurrentResidence"
									options={[
										{ label: t('currentresidence.Gaza'), value: 'Gaza' },
										{
											label: t('currentresidence.JabaliaCamp'),
											value: 'Jabalia Camp',
										},
										{
											label: t('currentresidence.KhanYunis'),
											value: 'Khan Yunis',
										},
										{ label: t('currentresidence.Rafah'), value: 'Rafah' },
										{
											label: t('currentresidence.DeiralBalah'),
											value: 'Deir al-Balah',
										},
										{
											label: t('currentresidence.Beachrefugeecamp'),
											value: 'Beach refugee camp',
										},
										{
											label: t('currentresidence.NuseiratCamp'),
											value: 'Nuseirat Camp',
										},
										{
											label: t('currentresidence.MaghaziCamp'),
											value: 'Maghazi Camp',
										},
										{
											label: t('currentresidence.BureijCamp'),
											value: 'Bureij Camp',
										},
										{
											label: t('currentresidence.AlShatiCamp'),
											value: 'Al-Shati Camp',
										},
									]}
									defaultValue={t('currentresidence.default')}
									className={` ${UpdateFamilyForm.errors.areaOfCurrentResidence ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
									value={UpdateFamilyForm.values.currentresidence}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
						</div>

						<div className="flex items-start justify-start w-full mb-8 gap-x-4">
							<div>
								<Select
									title={`${t('currentsituation.title')} *`}
									name="currentSituation"
									options={[
										{ label: t('currentsituation.good'), value: 'Good' },
										{ label: t('currentsituation.bad'), value: 'Bad' },
										{ label: t('currentsituation.worst'), value: 'Worst' },
									]}
									defaultValue={t('currentsituation.default')}
									className={` ${UpdateFamilyForm.errors.currentSituation ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
									value={UpdateFamilyForm.values.currentSituation}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>

							<div>
								<Select
									title={`${t('losesinwar.title')} *`}
									name="lossesInWar"
									options={[
										{ label: t('losesinwar.none'), value: 'none' },
										{ label: t('losesinwar.car'), value: 'car' },
										{ label: t('losesinwar.furniture'), value: 'furniture' },
										{ label: t('losesinwar.store'), value: 'store' },
										{ label: t('losesinwar.house'), value: 'house' },
										{ label: t('losesinwar.business'), value: 'business' },
									]}
									defaultValue={t('losesinwar.default')}
									className={` ${UpdateFamilyForm.errors.lossesInWar ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
									value={UpdateFamilyForm.values.lossesInWar}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
						</div>

						<div className="flex items-start justify-start w-full gap-x-4">
							<div>
								<Input
									title={`${t('FamilyMembers.title')} *`}
									name="numberOfFamilyMembers"
									type="number"
									className="mb-[5px] min-w-[300px]"
									value={UpdateFamilyForm.values.numberOfFamilyMembers}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>

							<div>
								<Input
									title={`${t('MartyrInFamily.title')} *`}
									name="numberOfMartyrInFamily"
									type="number"
									className="mb-[5px] min-w-[300px]"
									value={UpdateFamilyForm.values.numberOfMartyrInFamily}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>

							<div>
								<Input
									title={`${t('InfectedInFamily.title')} *`}
									name="numberOfInfectedInFamily"
									type="number"
									className="mb-[5px] min-w-[300px]"
									value={UpdateFamilyForm.values.numberOfInfectedInFamily}
									onChange={UpdateFamilyForm.handleChange}
								/>
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<h3 className="text-sm font-bold">{`${t('familyMemberDetails.title')} *`}</h3>
							{familyMembers.map((member: any, i: any) => (
								<div key={i} className="flex flex-col gap-3">
									<div>
										<h3 className="text-sm font-bold">{`${t('name.title')} *`}</h3>
									</div>
									<div className="flex items-center justify-start w-full gap-x-4">
										<Input
											title="In English"
											name="inEnglish"
											className="mb-[10px] min-w-[300px]"
											value={member.memberName.inEnglish}
											onChange={(e) =>
												handleMemberDetailChange(i, 'inEnglish', e.target.value)
											}
										/>
										<Input
											title="In Arabic"
											name="inArabic"
											className="mb-[10px] min-w-[300px]"
											value={member.memberName.inArabic}
											onChange={(e) =>
												handleMemberDetailChange(i, 'inArabic', e.target.value)
											}
										/>
										<Input
											title="In Turkish"
											name="inTurkish"
											className="mb-[10px] min-w-[300px]"
											value={member.memberName.inTurkish}
											onChange={(e) =>
												handleMemberDetailChange(i, 'inTurkish', e.target.value)
											}
										/>
									</div>
									<div className="flex items-center justify-start w-full gap-x-4">
										<Input
											title={`${t('age.title')} *`}
											className="mb-[5px] min-w-[300px]"
											type="number"
											value={member.memberAge}
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'memberAge',
													parseInt(e.target.value, 10),
												)
											}
										/>
										<Input
											title={`${t('memberIdNumber.title')} *`}
											className="mb-[5px] min-w-[300px]"
											type="number"
											value={member.MemberIdNumber}
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'MemberIdNumber',
													parseInt(e.target.value, 10),
												)
											}
										/>
										<Select
											title={`${t('gender.title')} *`}
											name="memberGender"
											options={[
												{ label: 'Male', value: 'male' },
												{ label: 'Female', value: 'female' },
											]}
											className="mb-[30px] min-w-[300px]"
											value={member.memberGender}
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'memberGender',
													e.target.value,
												)
											}
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="flex justify-center gap-7 mb-5">
						<Button
							type="submit"
							className="max-w-[200px] px-6 shadow-custom"
							isLoading={loading}
							title={t('titleForUpdate')}
							Color="#CF7475"
							onClick={(e) => {
								e.preventDefault();
								UpdateFamilyForm.handleSubmit();
							}}
						/>
						<Button
							type="submit"
							className="max-w-[200px] px-6 shadow-custom"
							title={t('delete')}
							Color="#000000"
							onClick={() => handleDeleteConfirmed(id)}
							isLoading={loading}
						/>
					</div>
				</div>
			</Modal>

			<DeleteFamilyModal
				openModal={openDeleteModal}
				id={deleteId}
				onClose={() => {
					setOpenDeleteModal(false);
				}}
				onDelete={() => {
					// console.log('Delete confirmed for ID:', deleteId);
					setOpenDeleteModal(false);
				}}
				onTableRefresh={onTableRefresh}
			/>
		</div>
	);
};

export default ViewModal;
function setLoading(arg0: boolean) {
	throw new Error('Function not implemented.');
}
