/* eslint-disable react/display-name */
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
import {
	genderInEnglish,
	genderInTurkish,
	genderInArabic,
	maritalStatusInEnglish,
	maritalStatusInTurkish,
	maritalStatusInArabic,
	previousResidenceInEnglish,
	previousResidenceInTurkish,
	previousResidenceInArabic,
	currentResidenceInEnglish,
	currentResidenceInTurkish,
	currentResidenceInArabic,
	currentSituationInEnglish,
	currentSituationInTurkish,
	currentSituationInArabic,
	lossesInWarInEnglish,
	lossesInWarInTurkish,
	lossesInWarInArabic,
} from '@/contants/addform';

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
		setShowTable(true);
		onClose();
	};

	const handleMemberDetailChange = (
		index: any,
		key: string,
		value: string | number,
		type?: string,
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
				memberGender: {
					inEnglish: '',
					inTurkish: '',
					inArabic: '',
				},
			};
		}
		if (key.startsWith('in')) {
			if (type === 'name') {
				updatedMembers[index].memberName[
					key as keyof FamilyMember['memberName']
				] = (value as string).toUpperCase();
			} else if (type === 'gender') {
				updatedMembers[index].memberGender[
					key as keyof FamilyMember['memberGender']
				] = value as string;
			}
		} else {
			updatedMembers[index][key as keyof FamilyMember] = value as
				| string
				| number;
		}
		setFamilyMembers(updatedMembers);
	};

	const t = useTranslations('AddFamilies.form');

	useEffect(() => {
		if (user && openModal) {
			fetchFamilyDetails(id)
				.then((familySponsor) => {
					// console.log('Success');
				})
				.catch((error) => {
					console.error('Error fetching family details:', error);
				});
		}
	}, [openModal, id, user]);

	const UpdateFamilyForm = useFormik({
		initialValues: UpdateFamilyValues,
		validationSchema: UpdateFamilySchema,
		onSubmit: async ({ values }: any) => {
			const response = {
				breadWinnerName: {
					inEnglish: UpdateFamilyForm.values.breadWinnerNameEn.toUpperCase(),
					inTurkish: UpdateFamilyForm.values.breadWinnerNameTr.toUpperCase(),
					inArabic: UpdateFamilyForm.values.breadWinnerNameAr.toUpperCase(),
				},
				description: {
					inEnglish: UpdateFamilyForm.values.descriptionEn,
					inTurkish: UpdateFamilyForm.values.descriptionTr,
					inArabic: UpdateFamilyForm.values.descriptionAr,
				},
				maritalStatus: {
					inEnglish: UpdateFamilyForm.values.maritalStatusEn,
					inTurkish: UpdateFamilyForm.values.maritalStatusTr,
					inArabic: UpdateFamilyForm.values.maritalStatusAr,
				},
				gender: {
					inEnglish: UpdateFamilyForm.values.genderEn,
					inTurkish: UpdateFamilyForm.values.genderTr,
					inArabic: UpdateFamilyForm.values.genderAr,
				},
				areaOfPreviousResidence: {
					inEnglish: UpdateFamilyForm.values.areaOfPreviousResidenceEn,
					inTurkish: UpdateFamilyForm.values.areaOfPreviousResidenceTr,
					inArabic: UpdateFamilyForm.values.areaOfPreviousResidenceAr,
				},
				areaOfCurrentResidence: {
					inEnglish: UpdateFamilyForm.values.areaOfCurrentResidenceEn,
					inTurkish: UpdateFamilyForm.values.areaOfCurrentResidenceTr,
					inArabic: UpdateFamilyForm.values.areaOfCurrentResidenceAr,
				},
				currentSituation: {
					inEnglish: UpdateFamilyForm.values.currentSituationEn,
					inTurkish: UpdateFamilyForm.values.currentSituationTr,
					inArabic: UpdateFamilyForm.values.currentSituationAr,
				},
				lossesInWar: {
					inEnglish: UpdateFamilyForm.values.lossesInWarEn,
					inTurkish: UpdateFamilyForm.values.lossesInWarTr,
					inArabic: UpdateFamilyForm.values.lossesInWarAr,
				},
				email: UpdateFamilyForm.values.email,
				language: UpdateFamilyForm.values.language,
				dateOfBirth: UpdateFamilyForm.values.dateOfBirth,
				numberOfFamilyMembers: parseInt(
					UpdateFamilyForm.values.numberOfFamilyMembers,
				),
				telephoneNumber: UpdateFamilyForm.values.telephoneNumber,
				idNumber: parseInt(UpdateFamilyForm.values.idNumber),
				numberOfMartyrInFamily: parseInt(
					UpdateFamilyForm.values.numberOfMartyrInFamily,
				),
				numberOfInfectedInFamily: parseInt(
					UpdateFamilyForm.values.numberOfInfectedInFamily,
				),
				familyMemberDetail: null,
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

	// useEffect(() => {
	// 	if (UpdateFamilyForm.values.numberOfFamilyMembers > familyMembers?.length) {
	// 		// Add new members
	// 		const newMembers = new Array(
	// 			UpdateFamilyForm.values.numberOfFamilyMembers - familyMembers?.length,
	// 		).fill({
	// 			memberName: { inEnglish: '', inArabic: '', inTurkish: '' },
	// 			memberGender: { inEnglish: '', inArabic: '', inTurkish: '' },
	// 			memberAge: '',
	// 			MemberIdNumber: '',
	// 		});
	// 		setFamilyMembers(familyMembers?.concat(newMembers));
	// 	} else if (
	// 		UpdateFamilyForm.values.numberOfFamilyMembers < familyMembers?.length
	// 	) {
	// 		// Remove excess members while preserving their details
	// 		const updatedMembers = familyMembers?.slice(
	// 			0,
	// 			UpdateFamilyForm.values.numberOfFamilyMembers,
	// 		);
	// 		setFamilyMembers(updatedMembers);
	// 	}
	// }, [UpdateFamilyForm.values?.numberOfFamilyMembers, familyMembers]);

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
				maritalStatusEn: family_Sponsor?.maritalStatus.inEnglish,
				maritalStatusAr: family_Sponsor?.maritalStatus.inArabic,
				maritalStatusTr: family_Sponsor?.maritalStatus.inTurkish,
				genderEn: family_Sponsor?.gender.inEnglish,
				genderAr: family_Sponsor?.gender.inArabic,
				genderTr: family_Sponsor?.gender.inTurkish,
				areaOfPreviousResidenceEn:
					family_Sponsor?.areaOfPreviousResidence.inEnglish,
				areaOfPreviousResidenceAr:
					family_Sponsor?.areaOfPreviousResidence.inArabic,
				areaOfPreviousResidenceTr:
					family_Sponsor?.areaOfPreviousResidence.inTurkish,
				areaOfCurrentResidenceEn:
					family_Sponsor?.areaOfCurrentResidence.inEnglish,
				areaOfCurrentResidenceAr:
					family_Sponsor?.areaOfCurrentResidence.inArabic,
				areaOfCurrentResidenceTr:
					family_Sponsor?.areaOfCurrentResidence.inTurkish,
				currentSituationEn: family_Sponsor?.currentSituation.inEnglish,
				currentSituationAr: family_Sponsor?.currentSituation.inArabic,
				currentSituationTr: family_Sponsor?.currentSituation.inTurkish,
				lossesInWarEn: family_Sponsor?.lossesInWar.inEnglish,
				lossesInWarAr: family_Sponsor?.lossesInWar.inArabic,
				lossesInWarTr: family_Sponsor?.lossesInWar.inTurkish,
			});
			setFamilyMembers(family_Sponsor?.familyMemberDetail);
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
											title={`${t('in_eng')}`}
											name="breadWinnerNameEn"
											className="mb-1 min-w-[300px]"
											value={UpdateFamilyForm.values.breadWinnerNameEn}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.breadWinnerNameEn &&
												UpdateFamilyForm.errors.breadWinnerNameEn &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.breadWinnerNameEn &&
											UpdateFamilyForm.errors.breadWinnerNameEn && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.breadWinnerNameEn as any}
												</p>
											)}
									</div>

									<div>
										<Input
											title={`${t('in_tur')} *`}
											name="breadWinnerNameTr"
											className="mb-1 min-w-[300px]"
											value={UpdateFamilyForm.values.breadWinnerNameTr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.breadWinnerNameTr &&
												UpdateFamilyForm.errors.breadWinnerNameTr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.breadWinnerNameTr &&
											UpdateFamilyForm.errors.breadWinnerNameTr && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.breadWinnerNameTr as any}
												</p>
											)}
									</div>
									<div>
										<Input
											title={`${t('in_ar')} *`}
											name="breadWinnerNameAr"
											className="mb-1 min-w-[300px]"
											value={UpdateFamilyForm.values.breadWinnerNameAr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.breadWinnerNameAr &&
												UpdateFamilyForm.errors.breadWinnerNameAr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.breadWinnerNameAr &&
											UpdateFamilyForm.errors.breadWinnerNameAr && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.breadWinnerNameAr as any}
												</p>
											)}
									</div>
								</div>
								<h3 className=" text-sm font-bold">{`${t('martialstatus.title')} *`}</h3>
								<div className="flex items-start justify-start w-full gap-x-4">
									<div>
										<Select
											title={`${t('in_eng')} *`}
											name="maritalStatusEn"
											options={maritalStatusInEnglish}
											className={` ${UpdateFamilyForm.errors.maritalStatusEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.maritalStatusEn}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.maritalStatusEn &&
												UpdateFamilyForm.errors.maritalStatusEn &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.errors.maritalStatusEn && (
											<p className="text-sm mb-2 text-red">
												{UpdateFamilyForm.touched.maritalStatusEn &&
													(UpdateFamilyForm.errors.maritalStatusEn as any)}
											</p>
										)}
									</div>
									<div>
										<Select
											title={`${t('in_ar')} *`}
											name="maritalStatusAr"
											options={maritalStatusInArabic}
											className={` ${UpdateFamilyForm.errors.maritalStatusAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.maritalStatusAr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.maritalStatusAr &&
												UpdateFamilyForm.errors.maritalStatusAr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.errors.maritalStatusAr && (
											<p className="text-sm mb-2 text-red">
												{UpdateFamilyForm.touched.maritalStatusAr &&
													(UpdateFamilyForm.errors.maritalStatusAr as any)}
											</p>
										)}
									</div>
									<div>
										<Select
											title={`${t('in_tur')} *`}
											name="maritalStatusTr"
											options={maritalStatusInTurkish}
											className={` ${UpdateFamilyForm.errors.maritalStatusTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.maritalStatusTr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.maritalStatusTr &&
												UpdateFamilyForm.errors.maritalStatusTr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.errors.maritalStatusTr && (
											<p className="text-sm mb-2 text-red">
												{UpdateFamilyForm.touched.maritalStatusTr &&
													(UpdateFamilyForm.errors.maritalStatusTr as any)}
											</p>
										)}
									</div>
								</div>
								<h3 className="mt-5 text-sm font-bold">{`${t('gender.title')} *`}</h3>
								<div className="flex items-start justify-start w-full gap-x-4">
									<div>
										<Select
											title={`${t('in_eng')} *`}
											name="genderEn"
											options={genderInEnglish}
											defaultValue={t('gender.default')}
											className="mb-[40px] min-w-[300px] mt-[2px] "
											value={UpdateFamilyForm.values.genderEn}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.genderEn &&
												UpdateFamilyForm.errors.genderEn &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.genderEn &&
											UpdateFamilyForm.errors.genderEn && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.genderEn as any}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_ar')} *`}
											name="genderAr"
											options={genderInArabic}
											defaultValue={t('gender.default')}
											className="mb-[40px] min-w-[300px] mt-[2px] "
											value={UpdateFamilyForm.values.genderAr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.genderAr &&
												UpdateFamilyForm.errors.genderAr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.genderAr &&
											UpdateFamilyForm.errors.genderAr && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.genderAr as any}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_tur')} *`}
											name="genderTr"
											options={genderInTurkish}
											defaultValue={t('gender.default')}
											className="mb-[40px] min-w-[300px] mt-[2px] "
											value={UpdateFamilyForm.values.genderTr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.genderTr &&
												UpdateFamilyForm.errors.genderTr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.genderTr &&
											UpdateFamilyForm.errors.genderTr && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.genderTr as any}
												</p>
											)}
									</div>
								</div>
								<h3 className="mt-3 text-sm font-bold">{`${t('previousresidence.title')} *`}</h3>
								<div className="flex items-start justify-start w-full gap-x-4">
									<div>
										<Select
											title={`${t('in_eng')} *`}
											name="areaOfPreviousResidenceEn"
											options={previousResidenceInEnglish}
											defaultValue={t('previousresidence.default')}
											className={` ${UpdateFamilyForm.errors.areaOfPreviousResidenceEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.areaOfPreviousResidenceEn}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.areaOfPreviousResidenceEn &&
												UpdateFamilyForm.errors.areaOfPreviousResidenceEn &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.areaOfPreviousResidenceEn &&
											UpdateFamilyForm.errors.areaOfPreviousResidenceEn && (
												<p className="text-sm mb-2 text-red">
													{
														UpdateFamilyForm.errors
															.areaOfPreviousResidenceEn as any
													}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_ar')} *`}
											name="areaOfPreviousResidenceAr"
											options={previousResidenceInArabic}
											defaultValue={t('previousresidence.default')}
											className={` ${UpdateFamilyForm.errors.areaOfPreviousResidenceAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.areaOfPreviousResidenceAr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.areaOfPreviousResidenceAr &&
												UpdateFamilyForm.errors.areaOfPreviousResidenceAr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.areaOfPreviousResidenceAr &&
											UpdateFamilyForm.errors.areaOfPreviousResidenceAr && (
												<p className="text-sm mb-2 text-red">
													{
														UpdateFamilyForm.errors
															.areaOfPreviousResidenceAr as any
													}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_tur')} *`}
											name="areaOfPreviousResidenceTr"
											options={previousResidenceInTurkish}
											defaultValue={t('previousresidence.default')}
											className={` ${UpdateFamilyForm.errors.areaOfPreviousResidenceTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.areaOfPreviousResidenceTr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.areaOfPreviousResidenceTr &&
												UpdateFamilyForm.errors.areaOfPreviousResidenceTr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.areaOfPreviousResidenceTr &&
											UpdateFamilyForm.errors.areaOfPreviousResidenceTr && (
												<p className="text-sm mb-2 text-red">
													{
														UpdateFamilyForm.errors
															.areaOfPreviousResidenceTr as any
													}
												</p>
											)}
									</div>
								</div>
								<h3 className="mt-10 text-sm font-bold">{`${t('currentresidence.title')} *`}</h3>
								<div className="flex items-start justify-start w-full gap-x-4">
									<div>
										<Select
											title={`${t('in_eng')} *`}
											name="areaOfCurrentResidenceEn"
											options={currentResidenceInEnglish}
											defaultValue={t('currentresidence.default')}
											className={` ${UpdateFamilyForm.errors.areaOfCurrentResidenceEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.areaOfCurrentResidenceEn}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.areaOfCurrentResidenceEn &&
												UpdateFamilyForm.errors.areaOfCurrentResidenceEn &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.areaOfCurrentResidenceEn &&
											UpdateFamilyForm.errors.areaOfCurrentResidenceEn && (
												<p className="text-sm mb-2 text-red">
													{
														UpdateFamilyForm.errors
															.areaOfCurrentResidenceEn as any
													}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_ar')} *`}
											name="areaOfCurrentResidenceAr"
											options={currentResidenceInArabic}
											defaultValue={t('currentresidence.default')}
											className={` ${UpdateFamilyForm.errors.areaOfCurrentResidenceAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.areaOfCurrentResidenceAr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.areaOfCurrentResidenceAr &&
												UpdateFamilyForm.errors.areaOfCurrentResidenceAr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.areaOfCurrentResidenceAr &&
											UpdateFamilyForm.errors.areaOfCurrentResidenceAr && (
												<p className="text-sm mb-2 text-red">
													{
														UpdateFamilyForm.errors
															.areaOfCurrentResidenceAr as any
													}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_tur')} *`}
											name="areaOfCurrentResidenceTr"
											options={currentResidenceInTurkish}
											defaultValue={t('currentresidence.default')}
											className={` ${UpdateFamilyForm.errors.areaOfCurrentResidenceTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.areaOfCurrentResidenceTr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.areaOfCurrentResidenceTr &&
												UpdateFamilyForm.errors.areaOfCurrentResidenceTr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.areaOfCurrentResidenceTr &&
											UpdateFamilyForm.errors.areaOfCurrentResidenceTr && (
												<p className="text-sm mb-2 text-red">
													{
														UpdateFamilyForm.errors
															.areaOfCurrentResidenceTr as any
													}
												</p>
											)}
									</div>
								</div>
								<h3 className="mt-10 text-sm font-bold">{`${t('currentsituation.title')} *`}</h3>
								<div className="flex items-start justify-start w-full gap-x-4">
									<div>
										<Select
											title={`${t('in_eng')} *`}
											name="currentSituationEn"
											options={currentSituationInEnglish}
											defaultValue={t('currentsituation.default')}
											className={` ${UpdateFamilyForm.errors.currentSituationEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.currentSituationEn}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.currentSituationEn &&
												UpdateFamilyForm.errors.currentSituationEn &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.currentSituationEn &&
											UpdateFamilyForm.errors.currentSituationEn && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.currentSituationEn as any}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_ar')} *`}
											name="currentSituationAr"
											options={currentSituationInArabic}
											defaultValue={t('currentsituation.default')}
											className={` ${UpdateFamilyForm.errors.currentSituationAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.currentSituationAr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.currentSituationAr &&
												UpdateFamilyForm.errors.currentSituationAr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.currentSituationAr &&
											UpdateFamilyForm.errors.currentSituationAr && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.currentSituationAr as any}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_tur')} *`}
											name="currentSituationTr"
											options={currentSituationInTurkish}
											defaultValue={t('currentsituation.default')}
											className={` ${UpdateFamilyForm.errors.currentSituationTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.currentSituationTr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.currentSituationTr &&
												UpdateFamilyForm.errors.currentSituationTr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.currentSituationTr &&
											UpdateFamilyForm.errors.currentSituationTr && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.currentSituationTr as any}
												</p>
											)}
									</div>
								</div>
								<h3 className="mt-10 text-sm font-bold">{`${t('losesinwar.title')} *`}</h3>
								<div className="flex items-start justify-start w-full gap-x-4">
									<div>
										<Select
											title={`${t('in_eng')} *`}
											name="lossesInWarEn"
											options={lossesInWarInEnglish}
											defaultValue={t('losesinwar.default')}
											className={` ${UpdateFamilyForm.errors.lossesInWarEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.lossesInWarEn}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.lossesInWarEn &&
												UpdateFamilyForm.errors.lossesInWarEn &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.lossesInWarEn &&
											UpdateFamilyForm.errors.lossesInWarEn && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.lossesInWarEn as any}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_ar')} *`}
											name="lossesInWarAr"
											options={lossesInWarInArabic}
											defaultValue={t('losesinwar.default')}
											className={` ${UpdateFamilyForm.errors.lossesInWarAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.lossesInWarAr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.lossesInWarAr &&
												UpdateFamilyForm.errors.lossesInWarAr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.lossesInWarAr &&
											UpdateFamilyForm.errors.lossesInWarAr && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.lossesInWarAr as any}
												</p>
											)}
									</div>
									<div>
										<Select
											title={`${t('in_tur')} *`}
											name="lossesInWarTr"
											options={lossesInWarInTurkish}
											defaultValue={t('losesinwar.default')}
											className={` ${UpdateFamilyForm.errors.lossesInWarTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
											value={UpdateFamilyForm.values.lossesInWarTr}
											onChange={UpdateFamilyForm.handleChange}
											errorClass={
												UpdateFamilyForm.touched.lossesInWarTr &&
												UpdateFamilyForm.errors.lossesInWarTr &&
												'border-2 border-solid border-red'
											}
										/>
										{UpdateFamilyForm.touched.lossesInWarTr &&
											UpdateFamilyForm.errors.lossesInWarTr && (
												<p className="text-sm mb-2 text-red">
													{UpdateFamilyForm.errors.lossesInWarTr as any}
												</p>
											)}
									</div>
								</div>
							</div>
						</div>

						<div className="mt-10 flex items-start justify-start w-full gap-x-4">
							<div>
								<Input
									title={`${t('email.title')} *`}
									name="email"
									className="mb-1 min-w-[460px]"
									value={UpdateFamilyForm.values.email}
									onChange={UpdateFamilyForm.handleChange}
									errorClass={
										UpdateFamilyForm.touched.email &&
										UpdateFamilyForm.errors.email &&
										'border-2 border-solid border-red'
									}
								/>
								{UpdateFamilyForm.touched.email &&
									UpdateFamilyForm.errors.email && (
										<p className="text-sm mb-2 text-red">
											{UpdateFamilyForm.errors.email as any}
										</p>
									)}
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
									errorClass={
										UpdateFamilyForm.touched.language &&
										UpdateFamilyForm.errors.language &&
										'border-2 border-solid border-red'
									}
								/>
								{UpdateFamilyForm.touched.language &&
									UpdateFamilyForm.errors.language && (
										<p className="text-sm mb-2 text-red">
											{UpdateFamilyForm.errors.language as any}
										</p>
									)}
							</div>
						</div>

						<div className="flex items-start justify-start w-full gap-x-4">
							<div>
								<Input
									title={`${t('telephone.title')} *`}
									name="telephoneNumber"
									type="number"
									className="mb-1 min-w-[300px]"
									value={UpdateFamilyForm.values.telephoneNumber}
									onChange={UpdateFamilyForm.handleChange}
									errorClass={
										UpdateFamilyForm.touched.telephoneNumber &&
										UpdateFamilyForm.errors.telephoneNumber &&
										'border-2 border-solid border-red'
									}
								/>
								{UpdateFamilyForm.touched.telephoneNumber &&
									UpdateFamilyForm.errors.telephoneNumber && (
										<p className="text-sm mb-2 text-red">
											{UpdateFamilyForm.errors.telephoneNumber as any}
										</p>
									)}
							</div>

							<div>
								<Input
									title={`${t('id.title')} *`}
									name="idNumber"
									type="number"
									className="mb-1 min-w-[300px]"
									value={UpdateFamilyForm.values.idNumber}
									onChange={UpdateFamilyForm.handleChange}
									errorClass={
										UpdateFamilyForm.touched.idNumber &&
										UpdateFamilyForm.errors.idNumber &&
										'border-2 border-solid border-red'
									}
								/>
								{UpdateFamilyForm.touched.idNumber &&
									UpdateFamilyForm.errors.idNumber && (
										<p className="text-sm mb-2 text-red">
											{UpdateFamilyForm.errors.idNumber as any}
										</p>
									)}
							</div>
							<div>
								<Input
									title={`${t('dob.title')} *`}
									name="dateOfBirth"
									className="mb-1 min-w-[300px] "
									type="date"
									value={UpdateFamilyForm.values.dateOfBirth}
									onChange={UpdateFamilyForm.handleChange}
									errorClass={
										UpdateFamilyForm.touched.dateOfBirth &&
										UpdateFamilyForm.errors.dateOfBirth &&
										'border-2 border-solid border-red'
									}
								/>
								{UpdateFamilyForm.touched.dateOfBirth &&
									UpdateFamilyForm.errors.dateOfBirth && (
										<p className="text-sm mb-2 text-red">
											{UpdateFamilyForm.errors.dateOfBirth as any}
										</p>
									)}
							</div>
						</div>

						<div className="flex items-start justify-start w-full gap-x-4">
							<div>
								<Input
									title={`${t('FamilyMembers.title')} *`}
									name="numberOfFamilyMembers"
									type="number"
									className="mb-1 min-w-[300px]"
									value={UpdateFamilyForm.values.numberOfFamilyMembers}
									onChange={UpdateFamilyForm.handleChange}
									errorClass={
										UpdateFamilyForm.touched.numberOfFamilyMembers &&
										UpdateFamilyForm.errors.numberOfFamilyMembers &&
										'border-2 border-solid border-red'
									}
								/>
								{UpdateFamilyForm.touched.numberOfFamilyMembers &&
									UpdateFamilyForm.errors.numberOfFamilyMembers && (
										<p className="text-sm mb-2 text-red">
											{UpdateFamilyForm.errors.numberOfFamilyMembers as any}
										</p>
									)}
							</div>

							<div>
								<Input
									title={`${t('MartyrInFamily.title')} *`}
									name="numberOfMartyrInFamily"
									type="number"
									className="mb-1 min-w-[300px]"
									value={UpdateFamilyForm.values.numberOfMartyrInFamily}
									onChange={UpdateFamilyForm.handleChange}
									errorClass={
										UpdateFamilyForm.touched.numberOfMartyrInFamily &&
										UpdateFamilyForm.errors.numberOfMartyrInFamily &&
										'border-2 border-solid border-red'
									}
								/>

								{UpdateFamilyForm.touched.numberOfMartyrInFamily &&
									UpdateFamilyForm.errors.numberOfMartyrInFamily && (
										<p className="text-sm mb-2 text-red">
											{UpdateFamilyForm.errors.numberOfMartyrInFamily as any}
										</p>
									)}
							</div>

							<div>
								<Input
									title={`${t('InfectedInFamily.title')} *`}
									name="numberOfInfectedInFamily"
									type="number"
									className="mb-1 min-w-[300px]"
									value={UpdateFamilyForm.values.numberOfInfectedInFamily}
									onChange={UpdateFamilyForm.handleChange}
									errorClass={
										UpdateFamilyForm.touched.numberOfInfectedInFamily &&
										UpdateFamilyForm.errors.numberOfInfectedInFamily &&
										'border-2 border-solid border-red'
									}
								/>
								{UpdateFamilyForm.touched.numberOfInfectedInFamily &&
									UpdateFamilyForm.errors.numberOfInfectedInFamily && (
										<p className="text-sm mb-2 text-red">
											{UpdateFamilyForm.errors.numberOfInfectedInFamily as any}
										</p>
									)}
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<h3 className="text-sm font-bold">{`${t('familyMemberDetails.title')} *`}</h3>
							{familyMembers?.map((member: any, i: any) => (
								<div key={i} className="flex flex-col gap-3">
									<div>
										<h3 className="text-sm font-bold">{`${t('name.title')} *`}</h3>
									</div>
									<div className="flex items-center justify-start w-full gap-x-4">
										<Input
											title={`${t('in_eng')} *`}
											name="inEnglish"
											className="mb-[10px] min-w-[300px]"
											value={member.memberName.inEnglish}
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'inEnglish',
													e.target.value,
													'name',
												)
											}
										/>
										<Input
											title={`${t('in_ar')} *`}
											name="inArabic"
											className="mb-[10px] min-w-[300px]"
											value={member.memberName.inArabic}
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'inArabic',
													e.target.value,
													'name',
												)
											}
										/>
										<Input
											title={`${t('in_tur')} *`}
											name="inTurkish"
											className="mb-[10px] min-w-[300px]"
											value={member.memberName.inTurkish}
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'inTurkish',
													e.target.value,
													'name',
												)
											}
										/>
									</div>
									<div>
										<h3 className="text-sm font-bold">{`${t('gender.title')} *`}</h3>
									</div>
									<div className="flex items-center justify-start w-full gap-x-4">
										<Select
											title={`${t('in_eng')} *`}
											name="inEnglish"
											options={genderInEnglish}
											className="mb-[30px] min-w-[300px]"
											value={member.memberGender.inEnglish}
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'inEnglish',
													e.target.value,
													'gender',
												)
											}
										/>
										<Select
											title={`${t('in_ar')} *`}
											name="inArabic"
											options={genderInArabic}
											className="mb-[30px] min-w-[300px]"
											value={member.memberGender.inArabic}
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'inArabic',
													e.target.value,
													'gender',
												)
											}
										/>
										<Select
											title={`${t('in_tur')} *`}
											name="inTurkish"
											options={genderInTurkish}
											className="mb-[30px] min-w-[300px]"
											value={member.memberGender.inTurkish}
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'inTurkish',
													e.target.value,
													'gender',
												)
											}
										/>
									</div>
									<div className="flex items-center justify-start w-full gap-x-4">
										<Input
											title={`${t('age.title')} *`}
											className="mb-[5px] min-w-[460px]"
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
											className="mb-[5px] min-w-[460px]"
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
									</div>
								</div>
							))}
						</div>

						<div className=" flex flex-col gap-3 mt-4">
							<h3 className="text-sm font-bold" style={{ wordSpacing: '4px' }}>
								{' '}
								{t('comment.title')} (Optional)
							</h3>
							<div className="flex items-start justify-start w-full gap-x-4">
								<div className="flex flex-col gap-y-3">
									<label
										className="text-[16px] font-bold font-sans text-primary"
										htmlFor="descriptionEn"
									>
										{'In English'}
									</label>
									<textarea
										title={'In English'}
										name="descriptionEn"
										cols={30}
										rows={4}
										className="py-3 px-5 focus:outline-none bg-[#E8E8E8] text-[15px] max-w-[700px] mb-[5px] min-w-[300px] text-[#000000]"
										value={UpdateFamilyForm.values.descriptionEn}
										onChange={UpdateFamilyForm.handleChange}
									/>
								</div>
								<div className="flex flex-col gap-y-3">
									<label
										className="text-[16px] font-bold font-sans text-primary"
										htmlFor="descriptionAr"
									>
										{'In Turkish'}
									</label>
									<textarea
										dir={'rtl'}
										title={'In Arabic'}
										name="descriptionAr"
										cols={30}
										rows={4}
										className="py-3 px-5 focus:outline-none bg-[#E8E8E8] text-[15px] max-w-[700px] mb-[5px] min-w-[300px] text-[#000000]"
										value={UpdateFamilyForm.values.descriptionAr}
										onChange={UpdateFamilyForm.handleChange}
									/>
								</div>
								<div className="flex flex-col gap-y-3">
									<label
										className="text-[16px] font-bold font-sans text-primary"
										htmlFor="descriptionTr"
									>
										{'In Turkish'}
									</label>
									<textarea
										title={'In Turkish'}
										name="descriptionTr"
										cols={30}
										rows={4}
										className="py-3 px-5 focus:outline-none bg-[#E8E8E8] text-[15px] max-w-[700px] mb-[5px] min-w-[300px] text-[#000000]"
										value={UpdateFamilyForm.values.descriptionTr}
										onChange={UpdateFamilyForm.handleChange}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-center gap-7 mb-5">
						<Button
							type="submit"
							className="max-w-[200px] px-6 shadow-custom"
							isLoading={loading}
							title={`${t('titleForUpdate')}`}
							Color="#CF7475"
							onClick={(e) => {
								e.preventDefault();
								UpdateFamilyForm.handleSubmit();
							}}
						/>
						<Button
							type="submit"
							className="max-w-[200px] px-6 shadow-custom"
							title={`${t('delete')}`}
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
