// Note: FamilyRegistrationForm component...!

'use client';
import React, { useEffect, useState, useRef } from 'react';
import Input from '@/components/ui//Input';
import { ResetPassword } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import Select from '@/components/ui/Select';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useDirection from '@/hooks/useDirection';
import { AddFamiliesValues } from '@/contants';
import { useFormik, ErrorMessage } from 'formik';
// import Button from '@/components/ui/Button';
import Button from '@/components/ui/LandingPage/Button';
import { postJson } from '@/api/api.instances';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { number } from 'yup';
import { toast } from 'react-toastify';
import { AddFamiliesSchema } from '@/utils/validationSchema';
import { PATHS } from '@/contants';
import Heading from '@/components/ui/Heading/Heading';

// DATA

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

type IProps = {
	updatePassword: (arg: ResetPassword, id: String | undefined) => void;
	isLoading: boolean;
};

interface FamilyMember {
	memberName: {
		inEnglish: string;
		inTurkish: string;
		inArabic: string;
	};
	memberAge: number | '';
	MemberIdNumber: number | '';
	memberGender: {
		inEnglish: string;
		inTurkish: string;
		inArabic: string;
	};
}

const FamilyRegistrationForm = () => {
	const [userId, setUserId] = useState<string | null>(null);
	// const [familyMembers, setFamilyMembers] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const { user } = useLoggedInUser();
	const firstErrorRef = useRef<any>(null);
	const { url, replace, locale, redirectWithLocale } = useLocaleRouter();

	// const handleMemberDetailChange = (
	// 	index: any,
	// 	key: string,
	// 	value: string | number,
	// 	type?: string,
	// ) => {
	// 	// console.log(index);
	// 	const updatedMembers = [...familyMembers];
	// 	if (!updatedMembers[index]) {
	// 		updatedMembers[index] = {
	// 			memberName: {
	// 				inEnglish: '',
	// 				// inTurkish: '',
	// 				// inArabic: '',
	// 			},
	// 			memberAge: '',
	// 			MemberIdNumber: '',
	// 			memberGender: {
	// 				inEnglish: '',
	// 				// inTurkish: '',
	// 				// inArabic: '',
	// 			},
	// 		};
	// 	}
	// 	if (key.startsWith('in')) {
	// 		if (type === 'name') {
	// 			updatedMembers[index].memberName[
	// 				key as keyof FamilyMember['memberName']
	// 			] = (value as string).toUpperCase(); // Convert to uppercase
	// 		} else if (type === 'gender') {
	// 			updatedMembers[index].memberGender[
	// 				key as keyof FamilyMember['memberGender']
	// 			] = value as string; // Convert to uppercase
	// 		}
	// 	} else {
	// 		updatedMembers[index][key as keyof FamilyMember] = value as
	// 			| string
	// 			| number;
	// 	}
	// 	setFamilyMembers(updatedMembers);
	// };

	const t = useTranslations('AddFamilies.form');
	const t1 = useTranslations('FamilyValidationSchema'); // For Validation 
	const dir = useDirection();
	const { changeLocale } = useLocaleRouter();

	const AddFamiliesForm = useFormik({
		initialValues: AddFamiliesValues,
		validationSchema: AddFamiliesSchema(t1),
		onSubmit: async ({ values }: any) => {
			const response = {
				breadWinnerName: {
					inEnglish: AddFamiliesForm.values.breadWinnerNameEn.toUpperCase(),
					inTurkish: AddFamiliesForm.values.breadWinnerNameEn.toUpperCase(),
					inArabic: AddFamiliesForm.values.breadWinnerNameEn.toUpperCase(),
				},
				description: {
					inEnglish: AddFamiliesForm.values.descriptionEn,
					inTurkish: AddFamiliesForm.values.descriptionEn,
					inArabic: AddFamiliesForm.values.descriptionEn,
				},
				maritalStatus: {
					inEnglish: AddFamiliesForm.values.maritalStatusEn,
					inTurkish: AddFamiliesForm.values.maritalStatusEn,
					inArabic: AddFamiliesForm.values.maritalStatusEn
				},
				gender: {
					inEnglish: AddFamiliesForm.values.genderEn,
					inTurkish: AddFamiliesForm.values.genderEn,
					inArabic: AddFamiliesForm.values.genderEn
				},
				areaOfPreviousResidence: {
					inEnglish: AddFamiliesForm.values.areaOfPreviousResidenceEn,
					inTurkish: AddFamiliesForm.values.areaOfPreviousResidenceEn,
					inArabic: AddFamiliesForm.values.areaOfPreviousResidenceEn,
				},
				areaOfCurrentResidence: {
					inEnglish: AddFamiliesForm.values.areaOfCurrentResidenceEn,
					inTurkish: AddFamiliesForm.values.areaOfCurrentResidenceEn,
					inArabic: AddFamiliesForm.values.areaOfCurrentResidenceEn
				},
				currentSituation: {
					inEnglish: AddFamiliesForm.values.currentSituationEn,
					inTurkish: AddFamiliesForm.values.currentSituationEn,
					inArabic: AddFamiliesForm.values.currentSituationEn,
				},
				lossesInWar: {
					inEnglish: AddFamiliesForm.values.lossesInWarEn,
					inTurkish: AddFamiliesForm.values.lossesInWarEn,
					inArabic: AddFamiliesForm.values.lossesInWarEn,
				},
				email: AddFamiliesForm.values.email,
				language: AddFamiliesForm.values.language,
				password: AddFamiliesForm.values?.password,
				dateOfBirth: AddFamiliesForm.values.dateOfBirth,
				numberOfFamilyMembers: parseInt(
					AddFamiliesForm.values.numberOfFamilyMembers,
				),
				telephoneNumber: AddFamiliesForm.values.telephoneNumber,
				idNumber: parseInt(AddFamiliesForm.values.idNumber),
				numberOfMartyrInFamily: parseInt(
					AddFamiliesForm.values.numberOfMartyrInFamily,
				),
				numberOfInfectedInFamily: parseInt(
					AddFamiliesForm.values.numberOfInfectedInFamily,
				),
				familyMemberDetail: null,
			};
			try {
				
					setLoading(true);
					const res = await postJson(
						`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/family-register`,
						response,
						user?.key,
					);
					// console.log('Api res: ', res);
					if (res.success) {
						setLoading(false);
						AddFamiliesForm.resetForm();
						toast.success(`${t('verification')}`, {
							toastId: 'success',
							position: 'top-right',
							autoClose: 4000,
						});
						localStorage.setItem("FAMILY_OTP_KEY", res?.familyId);
						let url = PATHS.VERIFICATION;
						redirectWithLocale(locale, url);
					}
				
			} catch (error) {
				console.log('Something went wrong while registering a family: ', error);
				// toast.error(`${t('fill_form_correctly')}`, {
				// 	toastId: 'error',
				// 	position: 'bottom-right',
				// 	autoClose: 4000,
				// });
				toast.error(response.data.message, {
					toastId: 'error',
					position: 'bottom-right',
					autoClose: 4000,
				});
				setLoading(false);
				localStorage.removeItem("FAMILY_OTP_KEY");
			}
		},
	});

	const handleNumChange = (e: any, setFieldValue: Function) => {
		const inputValue = e.target.value;
		const inputName = e.target.name;
		// Check if the input is a non-negative integer or empty
		if (!inputValue.includes('-') && /^\d*$/.test(inputValue)) {
			// Set the value of the specific field in Formik
			setFieldValue(inputName, inputValue);
		} else {
			// Clear the field if a minus sign is entered
			setFieldValue(inputName, '');
		}
	};

	return (
		<div
			className=" scrollbarHide w-full my-[100px] max-w-[800px] animated-div flex items-center justify-center md:mr-auto register_form_res"
			dir={dir} // Set form overflow to auto
		>
			<div className="scrollbarHide">
				 <h2
					className="text-[24px] text-[#36454F] font-bold text-main leading-normal"
					style={{ textAlign: "center", paddingTop: '2%', fontSize: "2rem" }}
				>
					{t('registerFamily')}
				</h2> 
					{/* {t('title')} */}	
				{/* <div className="flex flex-col justify-center items-center mt-20">
						<Heading heading={t('registerFamily')} className="main_heading-black" />
					</div> */}
				

				{/* first */}
				<div className=" flex flex-col gap-3">
					{/* <h3 className=" text-sm font-bold"> {t('BreadWinnerName.title')} </h3> */}
					<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
						<div>
							<Input
								title={`${t('BreadWinnerName.title')} *`}
								name="breadWinnerNameEn"
								className="mb-1 min-w-[300px]"
								value={AddFamiliesForm.values?.breadWinnerNameEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.breadWinnerNameEn &&
									AddFamiliesForm.errors.breadWinnerNameEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.breadWinnerNameEn &&
								AddFamiliesForm.errors.breadWinnerNameEn && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.breadWinnerNameEn as any}
									</p>
								)}
						</div>

						{/* <div>
							<Input
								title={`${t('in_tur')} *`}
								name="breadWinnerNameTr"
								className="mb-1 min-w-[250px]"
								value={AddFamiliesForm.values?.breadWinnerNameTr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.breadWinnerNameTr &&
									AddFamiliesForm.errors.breadWinnerNameTr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.breadWinnerNameTr &&
								AddFamiliesForm.errors.breadWinnerNameTr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.breadWinnerNameTr as any}
									</p>
								)}
						</div> */}
						{/* <div>
							<Input
								title={`${t('in_ar')} *`}
								name="breadWinnerNameAr"
								className="mb-1 min-w-[250px]"
								value={AddFamiliesForm.values?.breadWinnerNameAr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.breadWinnerNameAr &&
									AddFamiliesForm.errors.breadWinnerNameAr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.breadWinnerNameAr &&
								AddFamiliesForm.errors.breadWinnerNameAr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.breadWinnerNameAr as any}
									</p>
								)}
						</div> */}
					</div>
				</div>

				{/* second */}

				<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
					<div>
						<Input
							title={`${t('email.title')} *`}
							name="email"
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.email}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.email &&
								AddFamiliesForm.errors.email &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.email && AddFamiliesForm.errors.email && (
							<p className="text-sm mb-2 text-red">
								{AddFamiliesForm.errors.email as any}
							</p>
						)}
					</div>
					<div>
						<Input
							// title={`${t('telephone.title')} *`}
							title={`${t('password')} *`}
							name="password"
							type="password"
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.password}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.password &&
								AddFamiliesForm.errors.password &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.password &&
							AddFamiliesForm.errors.password && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.password as any}
								</p>
							)}
					</div>
				</div>

				<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
					<div>
						<Input
							title={`${t('telephone.title')} *`}
							name="telephoneNumber"
							type="number"
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.telephoneNumber}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.telephoneNumber &&
								AddFamiliesForm.errors.telephoneNumber &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.telephoneNumber &&
							AddFamiliesForm.errors.telephoneNumber && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.telephoneNumber as any}
								</p>
							)}
					</div>
					<div>
						<Input
							title={`${t('dob.title')} *`}
							name="dateOfBirth"
							className="mb-[5px] min-w-[300px] "
							type="date"
							value={AddFamiliesForm.values?.dateOfBirth}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.dateOfBirth &&
								AddFamiliesForm.errors.dateOfBirth &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.dateOfBirth &&
							AddFamiliesForm.errors.dateOfBirth && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.dateOfBirth as any}
								</p>
							)}
					</div>
				</div>

				{/* language */}

				<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
					<div>
						<Input
							title={`${t('id.title')} *`}
							name="idNumber"
							type="number"
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.idNumber}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.idNumber &&
								AddFamiliesForm.errors.idNumber &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.idNumber &&
							AddFamiliesForm.errors.idNumber && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.idNumber as any}
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
							className={` ${AddFamiliesForm.errors.language ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
							value={AddFamiliesForm.values.language}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.language &&
								AddFamiliesForm.errors.language &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.language &&
							AddFamiliesForm.errors.language && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.language as any}
								</p>
							)}
					</div>
				</div>

				{/* Marital Status */}
				<div className=" flex flex-col gap-3 mt-8">
					{/* <h3 className=" text-sm font-bold"> {t('maritalStatus.title')} </h3> */}
					<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
						<div>
							<Select
								// title="Select Marital Status"
								title={`${t('martialstatus.title')} *`}
								name="maritalStatusEn"
								options={[
									{ label: t('martialstatus.single'), value: t('martialstatus.single')},
									{ label: t('martialstatus.married'), value: t('martialstatus.married')},
									{ label: t('martialstatus.widow'), value: t('martialstatus.widow')},
									{ label: t('martialstatus.divorced'), value: t('martialstatus.divorced')},
								]}
								defaultValue={t('martialstatus.default')}
								className={` ${AddFamiliesForm.errors.maritalStatusEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
								value={AddFamiliesForm.values?.maritalStatusEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.maritalStatusEn &&
									AddFamiliesForm.errors.maritalStatusEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.errors.maritalStatusEn && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.touched.maritalStatusEn &&
										(AddFamiliesForm.errors.maritalStatusEn as any)}
								</p>
							)}
						</div>

						<div>
							<Select
								// title='Select Gender'
								title={`${t('gender.title')} *`}
								name="genderEn"
								options={[
									{ label: t('gender.male'), value: t('gender.male')},
									{ label: t('gender.female'), value: t('gender.female')},
								]}
								defaultValue={t('gender.default')}
								className={` ${AddFamiliesForm.errors.genderEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
								value={AddFamiliesForm.values?.genderEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.genderEn &&
									AddFamiliesForm.errors.genderEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.errors.genderEn && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.touched.genderEn &&
										(AddFamiliesForm.errors.genderEn as any)}
								</p>
							)}
						</div>

						{/* <div>
							<Select
								title={`${t('in_tur')} *`}
								name="maritalStatusTr"
								options={maritalStatusInTurkish}
								defaultValue={t('martialstatus.default')}
								className={` ${AddFamiliesForm.errors.maritalStatusTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.maritalStatusTr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.maritalStatusTr &&
									AddFamiliesForm.errors.maritalStatusTr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.errors.maritalStatusTr && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.touched.maritalStatusTr &&
										(AddFamiliesForm.errors.maritalStatusTr as any)}
								</p>
							)}
						</div> */}

						{/* <div>
							<Select
								title={`${t('in_ar')} *`}
								name="maritalStatusAr"
								options={maritalStatusInArabic}
								defaultValue={t('martialstatus.default')}
								className={` ${AddFamiliesForm.errors.maritalStatusAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.maritalStatusAr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.maritalStatusAr &&
									AddFamiliesForm.errors.maritalStatusAr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.errors.maritalStatusAr && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.touched.maritalStatusAr &&
										(AddFamiliesForm.errors.maritalStatusAr as any)}
								</p>
							)}
						</div> */}
					</div>
				</div>

				{/* Gender */}

				{/* <div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold"> {t('gender.title')} </h3>
					<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
						<div>
							<Select
								title='Select Gender'
								// title={`${t('in_eng')} *`}
								name="genderEn"
								options={genderInEnglish}
								defaultValue={t('gender.default')}
								className={` ${AddFamiliesForm.errors.genderEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.genderEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.genderEn &&
									AddFamiliesForm.errors.genderEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.errors.genderEn && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.touched.genderEn &&
										(AddFamiliesForm.errors.genderEn as any)}
								</p>
							)}
						</div>

						<div>
							<Select
								title={`${t('in_tur')} *`}
								name="genderTr"
								options={genderInTurkish}
								defaultValue={t('gender.default')}
								className={` ${AddFamiliesForm.errors.genderTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.genderTr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.genderTr &&
									AddFamiliesForm.errors.genderTr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.errors.genderTr && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.touched.genderTr &&
										(AddFamiliesForm.errors.genderTr as any)}
								</p>
							)}
						</div>

						<div>
							<Select
								title={`${t('in_ar')} *`}
								name="genderAr"
								options={genderInArabic}
								defaultValue={t('gender.default')}
								className={` ${AddFamiliesForm.errors.genderAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.genderAr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.genderAr &&
									AddFamiliesForm.errors.genderAr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.errors.genderAr && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.touched.genderAr &&
										(AddFamiliesForm.errors.genderAr as any)}
								</p>
							)}
						</div>
					</div>
				</div> */}

				{/* Previous Residence */}

				<div className=" flex flex-col gap-3 mt-8">
					{/* <h3 className=" text-sm font-bold">
						{' '}
						{t('areaOfPreviousResidence.title')}{' '}
					</h3> */}
					<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
						<div>
							<Select
								// title='Select Area Of Previous Residence'
								title={`${t('previousresidence.title')} *`}
								name="areaOfPreviousResidenceEn"
								options={[
									{ label: t('previousresidence.Gaza'), value: t('previousresidence.Gaza')},
									{ label: t('previousresidence.JabaliaCamp'), value: t('previousresidence.JabaliaCamp')},
									{ label: t('previousresidence.KhanYunis'), value: t('previousresidence.KhanYunis')},
									{ label: t('previousresidence.DeiralBalah'), value: t('previousresidence.DeiralBalah')},
									{ label: t('previousresidence.Beachrefugeecamp'), value: t('previousresidence.Beachrefugeecamp')},
									{ label: t('previousresidence.NuseiratCamp'), value: t('previousresidence.NuseiratCamp')},
									{ label: t('previousresidence.NuseiratCamp'), value: t('previousresidence.NuseiratCamp')},
									{ label: t('previousresidence.MaghaziCamp'), value: t('previousresidence.MaghaziCamp')},
									{ label: t('previousresidence.BureijCamp'), value: t('previousresidence.BureijCamp')},
									{ label: t('previousresidence.AlShatiCamp'), value: t('previousresidence.AlShatiCamp')},
								]}
								defaultValue={t('previousresidence.default')}
								className={` ${AddFamiliesForm.errors.areaOfPreviousResidenceEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
								value={AddFamiliesForm.values?.areaOfPreviousResidenceEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.areaOfPreviousResidenceEn &&
									AddFamiliesForm.errors.areaOfPreviousResidenceEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.areaOfPreviousResidenceEn &&
								AddFamiliesForm.errors.areaOfPreviousResidenceEn && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.areaOfPreviousResidenceEn as any}
									</p>
								)}
						</div>

						<div>
							<Select
								// title="Select Area Of Current Residence"
								title={`${t('currentresidence.title')} *`}
								name="areaOfCurrentResidenceEn"
								options={[
									{ label: t('currentresidence.Gaza'), value: t('currentresidence.Gaza')},
									{ label: t('currentresidence.JabaliaCamp'), value: t('currentresidence.JabaliaCamp')},
									{ label: t('currentresidence.KhanYunis'), value: t('currentresidence.KhanYunis')},
									{ label: t('currentresidence.DeiralBalah'), value: t('currentresidence.DeiralBalah')},
									{ label: t('currentresidence.Beachrefugeecamp'), value: t('currentresidence.Beachrefugeecamp')},
									{ label: t('currentresidence.NuseiratCamp'), value: t('currentresidence.NuseiratCamp')},
									{ label: t('currentresidence.NuseiratCamp'), value: t('currentresidence.NuseiratCamp')},
									{ label: t('currentresidence.MaghaziCamp'), value: t('currentresidence.MaghaziCamp')},
									{ label: t('currentresidence.BureijCamp'), value: t('currentresidence.BureijCamp')},
									{ label: t('currentresidence.AlShatiCamp'), value: t('currentresidence.AlShatiCamp')},
								]}
								defaultValue={t('currentresidence.default')}
								className={` ${AddFamiliesForm.errors.areaOfCurrentResidenceEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
								value={AddFamiliesForm.values?.areaOfCurrentResidenceEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.areaOfCurrentResidenceEn &&
									AddFamiliesForm.errors.areaOfCurrentResidenceEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.areaOfCurrentResidenceEn &&
								AddFamiliesForm.errors.areaOfCurrentResidenceEn && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.areaOfCurrentResidenceEn as any}
									</p>
								)}
						</div>

						{/* <div>
							<Select
								title={`${t('in_tur')} *`}
								name="areaOfPreviousResidenceTr"
								options={previousResidenceInTurkish}
								defaultValue={t('previousresidence.default')}
								className={` ${AddFamiliesForm.errors.areaOfPreviousResidenceTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.areaOfPreviousResidenceTr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.areaOfPreviousResidenceTr &&
									AddFamiliesForm.errors.areaOfPreviousResidenceTr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.areaOfPreviousResidenceTr &&
								AddFamiliesForm.errors.areaOfPreviousResidenceTr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.areaOfPreviousResidenceTr as any}
									</p>
								)}
						</div> */}

						{/* <div>
							<Select
								title={`${t('in_ar')} *`}
								name="areaOfPreviousResidenceAr"
								options={previousResidenceInArabic}
								defaultValue={t('previousresidence.default')}
								className={` ${AddFamiliesForm.errors.areaOfPreviousResidenceAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.areaOfPreviousResidenceAr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.areaOfPreviousResidenceAr &&
									AddFamiliesForm.errors.areaOfPreviousResidenceAr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.areaOfPreviousResidenceAr &&
								AddFamiliesForm.errors.areaOfPreviousResidenceAr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.areaOfPreviousResidenceAr as any}
									</p>
								)}
						</div> */}
					</div>
				</div>

				{/* Current Residence */}

				{/* <div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold">
						{' '}
						{t('areaOfCurrentResidence.title')}{' '}
					</h3>
					<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
						<div>
							<Select
								title="Select Area Of Current Residence"
								// title={`${t('in_eng')} *`}
								name="areaOfCurrentResidenceEn"
								options={currentResidenceInEnglish}
								defaultValue={t('currentresidence.default')}
								className={` ${AddFamiliesForm.errors.areaOfCurrentResidenceEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.areaOfCurrentResidenceEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.areaOfCurrentResidenceEn &&
									AddFamiliesForm.errors.areaOfCurrentResidenceEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.areaOfCurrentResidenceEn &&
								AddFamiliesForm.errors.areaOfCurrentResidenceEn && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.areaOfCurrentResidenceEn as any}
									</p>
								)}
						</div>

						<div>
							<Select
								title={`${t('in_tur')} *`}
								name="areaOfCurrentResidenceTr"
								options={currentResidenceInTurkish}
								defaultValue={t('currentresidence.default')}
								className={` ${AddFamiliesForm.errors.areaOfCurrentResidenceTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.areaOfCurrentResidenceTr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.areaOfCurrentResidenceTr &&
									AddFamiliesForm.errors.areaOfCurrentResidenceTr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.areaOfCurrentResidenceTr &&
								AddFamiliesForm.errors.areaOfCurrentResidenceTr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.areaOfCurrentResidenceTr as any}
									</p>
								)}
						</div>

						<div>
							<Select
								title={`${t('in_ar')} *`}
								name="areaOfCurrentResidenceAr"
								options={currentResidenceInArabic}
								defaultValue={t('currentresidence.default')}
								className={` ${AddFamiliesForm.errors.areaOfCurrentResidenceAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.areaOfCurrentResidenceAr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.areaOfCurrentResidenceAr &&
									AddFamiliesForm.errors.areaOfCurrentResidenceAr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.areaOfCurrentResidenceAr &&
								AddFamiliesForm.errors.areaOfCurrentResidenceAr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.areaOfCurrentResidenceAr as any}
									</p>
								)}
						</div>
					</div>
				</div> */}

				{/* Current Situation */}
				<div className=" flex flex-col gap-3 mt-8">
					{/* <h3 className=" text-sm font-bold">
						{' '}
						{t('currentSituation.title')}{' '}
					</h3> */}
					<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
						<div>
							<Select
								// title="Select Current Situation"
								title={`${t('currentsituation.title')} *`}
								name="currentSituationEn"
								options={[
									{ label: t('currentsituation.totaldestruction'), value: t('currentsituation.totaldestruction')},
									{ label: t('currentsituation.partialdestruction'), value: t('currentsituation.partialdestruction')},
									{ label: t('currentsituation.intact'), value: t('currentsituation.intact')},
									{ label: t('currentsituation.rented'), value: t('currentsituation.rented')},
								]}
								defaultValue={t('currentsituation.default')}
								className={` ${AddFamiliesForm.errors.currentSituationEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
								value={AddFamiliesForm.values?.currentSituationEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.currentSituationEn &&
									AddFamiliesForm.errors.currentSituationEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.currentSituationEn &&
								AddFamiliesForm.errors.currentSituationEn && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.currentSituationEn as any}
									</p>
								)}
						</div>

						<div>
							<Select
								// title="Select Losses In War"
								title={`${t('losesinwar.title')} *`}
								name="lossesInWarEn"
								// options={lossesInWarInEnglish}
								options={[
									{ label: t('losesinwar.none'), value: t('losesinwar.none') },
									{ label: t('losesinwar.car'), value: t('losesinwar.car'), },
									{ label: t('losesinwar.furniture'), value:  t('losesinwar.furniture') },
									{ label: t('losesinwar.store'), value: t('losesinwar.store') },
									{ label: t('losesinwar.house'), value: t('losesinwar.house') },
									{ label: t('losesinwar.business'), value: t('losesinwar.business')},
								]}
								defaultValue={t('losesinwar.default')}
								className={` ${AddFamiliesForm.errors.lossesInWarEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[300px] mt-[2px]`}
								value={AddFamiliesForm.values.lossesInWarEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.lossesInWarEn &&
									AddFamiliesForm.errors.lossesInWarEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.lossesInWarEn &&
								AddFamiliesForm.errors.lossesInWarEn && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.lossesInWarEn as any}
									</p>
								)}
						</div>

						{/* <div>
							<Select
								title={`${t('in_tur')} *`}
								name="currentSituationTr"
								options={currentSituationInTurkish}
								defaultValue={t('currentsituation.default')}
								className={` ${AddFamiliesForm.errors.currentSituationTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.currentSituationTr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.currentSituationTr &&
									AddFamiliesForm.errors.currentSituationTr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.currentSituationTr &&
								AddFamiliesForm.errors.currentSituationTr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.currentSituationTr as any}
									</p>
								)}
						</div> */}

						{/* <div>
							<Select
								title={`${t('in_ar')} *`}
								name="currentSituationAr"
								options={currentSituationInArabic}
								defaultValue={t('currentsituation.default')}
								className={` ${AddFamiliesForm.errors.currentSituationAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values?.currentSituationAr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.currentSituationAr &&
									AddFamiliesForm.errors.currentSituationAr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.currentSituationAr &&
								AddFamiliesForm.errors.currentSituationAr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.currentSituationAr as any}
									</p>
								)}
						</div> */}
					</div>
				</div>

				{/* Losses In War */}
				{/* <div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold"> {t('lossesInWar.title')} </h3>
					<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
						<div>
							<Select
								title="Select Losses In War"
								// title={`${t('in_eng')} *`}
								name="lossesInWarEn"
								options={lossesInWarInEnglish}
								defaultValue={t('losesinwar.default')}
								className={` ${AddFamiliesForm.errors.lossesInWarEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values.lossesInWarEn}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.lossesInWarEn &&
									AddFamiliesForm.errors.lossesInWarEn &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.lossesInWarEn &&
								AddFamiliesForm.errors.lossesInWarEn && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.lossesInWarEn as any}
									</p>
								)}
						</div>

						<div>
							<Select
								title={`${t('in_tur')} *`}
								name="lossesInWarTr"
								options={lossesInWarInTurkish}
								defaultValue={t('losesinwar.default')}
								className={` ${AddFamiliesForm.errors.lossesInWarTr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values.lossesInWarTr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.lossesInWarTr &&
									AddFamiliesForm.errors.lossesInWarTr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.lossesInWarTr &&
								AddFamiliesForm.errors.lossesInWarTr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.lossesInWarTr as any}
									</p>
								)}
						</div>

						<div>
							<Select
								title={`${t('in_ar')} *`}
								name="lossesInWarAr"
								options={lossesInWarInArabic}
								defaultValue={t('losesinwar.default')}
								className={` ${AddFamiliesForm.errors.lossesInWarAr ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
								value={AddFamiliesForm.values.lossesInWarAr}
								onChange={AddFamiliesForm.handleChange}
								errorClass={
									AddFamiliesForm.touched.lossesInWarAr &&
									AddFamiliesForm.errors.lossesInWarAr &&
									'border-2 border-solid border-red'
								}
							/>
							{AddFamiliesForm.touched.lossesInWarAr &&
								AddFamiliesForm.errors.lossesInWarAr && (
									<p className="text-sm mb-2 text-red">
										{AddFamiliesForm.errors.lossesInWarAr as any}
									</p>
								)}
						</div>
					</div>
				</div> */}

				{/* seventh */}

				<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4 mt-8">
					<div>
						<Input
							title={`${t('FamilyMembers.title')} *`}
							name="numberOfFamilyMembers"
							type="number"
							min={0}
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.numberOfFamilyMembers}
							// onChange={AddFamiliesForm.handleChange}
							onChange={(e) =>
								handleNumChange(e, AddFamiliesForm.setFieldValue)
							}
							errorClass={
								AddFamiliesForm.touched.numberOfFamilyMembers &&
								AddFamiliesForm.errors.numberOfFamilyMembers &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.numberOfFamilyMembers &&
							AddFamiliesForm.errors.numberOfFamilyMembers && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.numberOfFamilyMembers as any}
								</p>
							)}
					</div>

					<div>
						<Input
							title={`${t('MartyrInFamily.title')} *`}
							name="numberOfMartyrInFamily"
							type="number"
							min={0}
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.numberOfMartyrInFamily}
							// onChange={AddFamiliesForm.handleChange}
							onChange={(e) =>
								handleNumChange(e, AddFamiliesForm.setFieldValue)
							}
							errorClass={
								AddFamiliesForm.touched.numberOfMartyrInFamily &&
								AddFamiliesForm.errors.numberOfMartyrInFamily &&
								'border-2 border-solid border-red'
							}
						/>

						{AddFamiliesForm.touched.numberOfMartyrInFamily &&
							AddFamiliesForm.errors.numberOfMartyrInFamily && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.numberOfMartyrInFamily as any}
								</p>
							)}
					</div>

					<div>
						<Input
							title={`${t('InfectedInFamily.title')} *`}
							name="numberOfInfectedInFamily"
							type="number"
							min={0}
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.numberOfInfectedInFamily}
							// onChange={AddFamiliesForm.handleChange}
							onChange={(e) =>
								handleNumChange(e, AddFamiliesForm.setFieldValue)
							}
							errorClass={
								AddFamiliesForm.touched.numberOfInfectedInFamily &&
								AddFamiliesForm.errors.numberOfInfectedInFamily &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.numberOfInfectedInFamily &&
							AddFamiliesForm.errors.numberOfInfectedInFamily && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.numberOfInfectedInFamily as any}
								</p>
							)}
					</div>
				</div>

				{/* eigth */}

				{/* COMMENT  */}
				<div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold " style={{ wordSpacing: '4px' }}>
						{' '}
						{t('comment.title')} {t("optional")}
					</h3>
					<div className="flex flex-col sm:flex-row items-start justify-start w-full gap-x-4">
						<div className="flex flex-col gap-y-3">
							{/* <label
								className="text-[16px] font-bold font-sans text-primary"
								htmlFor="descriptionEn"
							>
								{'In English'}
							</label> */}
							<textarea
								title={'In English'}
								name="descriptionEn"
								cols={30}
								rows={4}
								placeholder= {t("commentPlaceHolder")}
								className="py-3 px-5 focus:outline-none bg-[#E8E8E8] text-[15px] max-w-[600px] mb-[5px] min-w-[300px] text-[#000000]"
								value={AddFamiliesForm.values?.descriptionEn}
								onChange={AddFamiliesForm.handleChange}
							/>
						</div>
						{/* <div className="flex flex-col gap-y-3">
							<label
								className="text-[16px] font-bold font-sans text-primary"
								htmlFor="descriptionAr"
							>
								{'In Arabic'}
							</label>
							<textarea
								dir={'rtl'}
								title={'In Arabic'}
								name="descriptionAr"
								cols={30}
								rows={4}
								placeholder="أدخل رسالتك..."
								className="py-3 px-5 focus:outline-none bg-[#E8E8E8] text-[15px] max-w-[700px] mb-[5px] min-w-[250px] text-[#000000]"
								value={AddFamiliesForm.values?.descriptionAr}
								onChange={AddFamiliesForm.handleChange}
							/>
						</div> */}
						{/* <div className="flex flex-col gap-y-3">
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
								placeholder="Mesajınızı girin..."
								className="py-3 px-5 focus:outline-none bg-[#E8E8E8] text-[15px] max-w-[700px] mb-[5px] min-w-[250px] text-[#000000]"
								value={AddFamiliesForm.values?.descriptionTr}
								onChange={AddFamiliesForm.handleChange}
							/>
						</div> */}
					</div>
				</div>

				<div
					className="flex my-5"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<Button
						onClick={(e) => {
							e.preventDefault();
							AddFamiliesForm.handleSubmit();
						}}
						type="submit"
						className="max-w-[200px] px-6 shadow-custom"
						isLoading={loading}
						title={t('register')}
						// title='Register Family'
						Color="#CF7475"
					/>
				</div>
			</div>
		</div>
	);
};

export default FamilyRegistrationForm;