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
	memberGender: string;
}

const FamilyForm = () => {
	const [userId, setUserId] = useState<string | null>(null);
	const [familyMembers, setFamilyMembers] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const { user } = useLoggedInUser();
	const firstErrorRef = useRef<any>(null);

	const handleMemberDetailChange = (
		index: any,
		key: string,
		value: string | number,
	) => {
		// console.log(index);
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
	const dir = useDirection();
	const { changeLocale } = useLocaleRouter();

	const AddFamiliesForm = useFormik({
		initialValues: AddFamiliesValues,
		validationSchema: AddFamiliesSchema,
		onSubmit: async ({ values }: any) => {
			console.log('va', AddFamiliesForm.values);

			const response = {
				breadWinnerName: {
					inEnglish: AddFamiliesForm.values.breadWinnerNameEn.toUpperCase(),
					inTurkish: AddFamiliesForm.values.breadWinnerNameTr.toUpperCase(),
					inArabic: AddFamiliesForm.values.breadWinnerNameAr.toUpperCase(),
				},
				description: {
					inEnglish: AddFamiliesForm.values.descriptionEn,
					inTurkish: AddFamiliesForm.values.descriptionTr,
					inArabic: AddFamiliesForm.values.descriptionAr,
				},
				maritalStatus: {
					inEnglish: AddFamiliesForm.values.maritalStatusEn,
					inTurkish: AddFamiliesForm.values.maritalStatusTr,
					inArabic: AddFamiliesForm.values.maritalStatusAr,
				},
				gender: {
					inEnglish: AddFamiliesForm.values.genderEn,
					inTurkish: AddFamiliesForm.values.genderTr,
					inArabic: AddFamiliesForm.values.genderAr,
				},
				areaOfPreviousResidence: {
					inEnglish: AddFamiliesForm.values.areaOfPreviousResidenceEn,
					inTurkish: AddFamiliesForm.values.areaOfPreviousResidenceTr,
					inArabic: AddFamiliesForm.values.areaOfPreviousResidenceAr,
				},
				areaOfCurrentResidence: {
					inEnglish: AddFamiliesForm.values.areaOfCurrentResidenceEn,
					inTurkish: AddFamiliesForm.values.areaOfCurrentResidenceTr,
					inArabic: AddFamiliesForm.values.areaOfCurrentResidenceAr,
				},
				currentSituation: {
					inEnglish: AddFamiliesForm.values.currentSituationEn,
					inTurkish: AddFamiliesForm.values.currentSituationTr,
					inArabic: AddFamiliesForm.values.currentSituationAr,
				},
				lossesInWar: {
					inEnglish: AddFamiliesForm.values.lossesInWarEn,
					inTurkish: AddFamiliesForm.values.lossesInWarTr,
					inArabic: AddFamiliesForm.values.lossesInWarAr,
				},
				email: AddFamiliesForm.values.email,
				language: AddFamiliesForm.values.language,
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
				familyMemberDetail: familyMembers,
			};
			try {
				if (
					AddFamiliesForm.values.numberOfFamilyMembers > 0 &&
					familyMembers.length === 0
				) {
					toast.error(`${t('family_details_error')}`, {
						toastId: 'error',
						position: 'bottom-right',
						autoClose: 4000,
					});
				} else {
					setLoading(true);
					const res = await postJson(
						`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin-family-register`,
						response,
						user?.key,
					);
					if (res.success) {
						setLoading(false);
						AddFamiliesForm.resetForm();
						toast.success(`${t('submit')}`, {
							toastId: 'success',
							position: 'bottom-right',
							autoClose: 4000,
						});
					}
				}
			} catch (error) {
				toast.error(`${t('fill_form_correctly')}`, {
					toastId: 'error',
					position: 'bottom-right',
					autoClose: 4000,
				});
			}
		},
	});

	return (
		<div
			className=" scrollbarHide"
			dir={dir} // Set form overflow to auto
		>
			<div className="scrollbarHide ">
				<h2 className="text-[24px] font-bold text-main mt-2 leading-normal py-2 ">
					{t('title')}
				</h2>

				{/* first */}
				<div className=" flex flex-col gap-3">
					<h3 className=" text-sm font-bold"> {t('BreadWinnerName.title')} </h3>
					<div className="flex items-start justify-start w-full gap-x-4">
						<div>
							<Input
								title={`${t('in_eng')} *`}
								name="breadWinnerNameEn"
								className="mb-1 min-w-[250px]"
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

						<div>
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
						</div>
						<div>
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
						</div>
					</div>
				</div>

				{/* second */}

				<div className="flex items-start justify-start w-full gap-x-4">
					<div>
						<Input
							title={`${t('email.title')} *`}
							name="email"
							className="mb-[5px] min-w-[460px]"
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
							title={`${t('telephone.title')} *`}
							name="telephoneNumber"
							type="number"
							className="mb-[5px] min-w-[460px]"
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
				</div>

				<div className="flex items-start justify-start w-full gap-x-4">
					<div>
						<Input
							title={`${t('dob.title')} *`}
							name="dateOfBirth"
							className="mb-[5px] min-w-[460px] "
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

					<div>
						<Input
							title={`${t('id.title')} *`}
							name="idNumber"
							type="number"
							className="mb-[5px] min-w-[460px]"
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
				</div>

				{/* language */}

				<div className="flex items-start justify-start w-full mb-8 gap-x-4">
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
							className={` ${AddFamiliesForm.errors.language ? 'mb-[40px]' : 'mb-[5px]'} min-w-[380px] mt-[2px]`}
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
					<h3 className=" text-sm font-bold"> {t('maritalStatus.title')} </h3>
					<div className="flex items-start justify-start w-full gap-x-4">
						<div>
							<Select
								title={`${t('in_eng')} *`}
								name="maritalStatusEn"
								options={maritalStatusInEnglish}
								defaultValue={t('martialstatus.default')}
								className={` ${AddFamiliesForm.errors.maritalStatusEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
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
						</div>

						<div>
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
						</div>
					</div>
				</div>

				{/* Gender */}

				<div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold"> {t('gender.title')} </h3>
					<div className="flex items-start justify-start w-full gap-x-4">
						<div>
							<Select
								title={`${t('in_eng')} *`}
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
				</div>

				{/* Previous Residence */}

				<div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold">
						{' '}
						{t('areaOfPreviousResidence.title')}{' '}
					</h3>
					<div className="flex items-start justify-start w-full gap-x-4">
						<div>
							<Select
								title={`${t('in_eng')} *`}
								name="areaOfPreviousResidenceEn"
								options={previousResidenceInEnglish}
								defaultValue={t('previousresidence.default')}
								className={` ${AddFamiliesForm.errors.areaOfPreviousResidenceEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
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
						</div>

						<div>
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
						</div>
					</div>
				</div>

				{/* Current Residence */}

				<div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold">
						{' '}
						{t('areaOfCurrentResidence.title')}{' '}
					</h3>
					<div className="flex items-start justify-start w-full gap-x-4">
						<div>
							<Select
								title={`${t('in_eng')} *`}
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
				</div>

				{/* Current Situation */}
				<div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold">
						{' '}
						{t('currentSituation.title')}{' '}
					</h3>
					<div className="flex items-start justify-start w-full gap-x-4">
						<div>
							<Select
								title={`${t('in_eng')} *`}
								name="currentSituationEn"
								options={currentSituationInEnglish}
								defaultValue={t('currentsituation.default')}
								className={` ${AddFamiliesForm.errors.currentSituationEn ? 'mb-[40px]' : 'mb-[5px]'} min-w-[360px] mt-[2px]`}
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
						</div>

						<div>
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
						</div>
					</div>
				</div>

				{/* Losses In War */}
				<div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold"> {t('lossesInWar.title')} </h3>
					<div className="flex items-start justify-start w-full gap-x-4">
						<div>
							<Select
								title={`${t('in_eng')} *`}
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
				</div>

				{/* seventh */}

				{/* COMMENT  */}
				<div className=" flex flex-col gap-3 mt-8">
					<h3 className=" text-sm font-bold " style={{ wordSpacing: '4px' }}>
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
								placeholder="Enter your message..."
								className="py-3 px-5 focus:outline-none bg-[#E8E8E8] text-[15px] max-w-[700px] mb-[5px] min-w-[250px] text-[#000000]"
								value={AddFamiliesForm.values?.descriptionEn}
								onChange={AddFamiliesForm.handleChange}
							/>
						</div>
						<div className="flex flex-col gap-y-3">
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
								placeholder="Mesajınızı girin..."
								className="py-3 px-5 focus:outline-none bg-[#E8E8E8] text-[15px] max-w-[700px] mb-[5px] min-w-[250px] text-[#000000]"
								value={AddFamiliesForm.values?.descriptionTr}
								onChange={AddFamiliesForm.handleChange}
							/>
						</div>
					</div>
				</div>

				<div className="flex items-start justify-start w-full gap-x-4 mt-8">
					<div>
						<Input
							title={`${t('FamilyMembers.title')} *`}
							name="numberOfFamilyMembers"
							type="number"
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.numberOfFamilyMembers}
							onChange={AddFamiliesForm.handleChange}
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
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.numberOfMartyrInFamily}
							onChange={AddFamiliesForm.handleChange}
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
							className="mb-[5px] min-w-[300px]"
							value={AddFamiliesForm.values?.numberOfInfectedInFamily}
							onChange={AddFamiliesForm.handleChange}
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
				{AddFamiliesForm.values.numberOfFamilyMembers > 0 &&
					AddFamiliesForm.values.numberOfFamilyMembers && (
						<div className=" flex flex-col gap-3">
							<h3 className=" text-sm font-bold">Family Member Details</h3>
							{[
								...Array(
									AddFamiliesForm.values.numberOfFamilyMembers > 0 &&
										parseInt(AddFamiliesForm.values.numberOfFamilyMembers),
								),
							].map((item, i) => (
								<div key={i} className="flex flex-col gap-3">
									<div>
										<h3 className=" text-sm font-bold">Name</h3>
									</div>
									<div className="flex items-center justify-start w-full gap-x-4">
										<Input
											title={`${t('in_eng')} *`}
											name="inenglish"
											className="mb-[10px] min-w-[250px]"
											// value={updateProfileForm.values?.name}
											onChange={(e) =>
												handleMemberDetailChange(i, 'inEnglish', e.target.value)
											}
										/>
										<Input
											title={`${t('in_tur')} *`}
											name="inturkish"
											className="mb-[10px] min-w-[250px]"
											// value={updateProfileForm.values?.email}
											onChange={(e) =>
												handleMemberDetailChange(i, 'inTurkish', e.target.value)
											}
										/>
										<Input
											title={`${t('in_ar')} *`}
											name="inarabic"
											className="mb-[10px] min-w-[250px]"
											// value={updateProfileForm.values?.email}
											onChange={(e) =>
												handleMemberDetailChange(i, 'inArabic', e.target.value)
											}
										/>
									</div>
									<div className="flex items-center justify-start w-full gap-x-4">
										<Input
											title={'Age'}
											className="mb-[5px] min-w-[400px] "
											type="number"
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'memberAge',
													parseInt(e.target.value),
												)
											}
										/>
										<Input
											title={'Member ID Number'}
											className="mb-[5px] min-w-[400px] "
											type="number"
											onChange={(e) =>
												handleMemberDetailChange(
													i,
													'MemberIdNumber',
													e.target.value,
												)
											}
										/>
									</div>
									{/* Gender */}

									<div className=" flex flex-col gap-3 mt-5">
										<h3 className=" text-sm font-bold">
											{' '}
											{t('gender.title')}{' '}
										</h3>
										<div className="flex items-start justify-start w-full gap-x-4">
											<div>
												<Select
													title={`${t('in_eng')} *`}
													name="genderEn"
													options={genderInEnglish}
													defaultValue={t('gender.default')}
													className="mb-[30px] min-w-[400px] "
													onChange={(e) =>
														handleMemberDetailChange(
															i,
															'memberGender',
															e.target.value,
														)
													}
												/>
											</div>

											<div>
												<Select
													title={`${t('in_tur')} *`}
													name="genderTr"
													options={genderInTurkish}
													defaultValue={t('gender.default')}
													className="mb-[30px] min-w-[400px] "
													onChange={(e) =>
														handleMemberDetailChange(
															i,
															'memberGender',
															e.target.value,
														)
													}
												/>
											</div>

											<div>
												<Select
													title={`${t('in_ar')} *`}
													name="genderAr"
													options={genderInArabic}
													defaultValue={t('gender.default')}
													className="mb-[30px] min-w-[400px] "
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
									</div>
								</div>
							))}
						</div>
					)}

				<div className="flex my-5">
					<Button
						onClick={(e) => {
							e.preventDefault();
							AddFamiliesForm.handleSubmit();
						}}
						type="submit"
						className="max-w-[200px] px-6 shadow-custom"
						isLoading={loading}
						title={t('title')}
						Color="#CF7475"
					/>
				</div>
			</div>
		</div>
	);
};

export default FamilyForm;
