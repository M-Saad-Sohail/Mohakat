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
				maritalStatus: AddFamiliesForm.values.maritalStatus,
				email: AddFamiliesForm.values.email,
				language: AddFamiliesForm.values.language,
				gender: AddFamiliesForm.values.gender,
				age: AddFamiliesForm.values.age,
				dateOfBirth: AddFamiliesForm.values.dateOfBirth,
				areaOfPreviousResidence: AddFamiliesForm.values.areaOfPreviousResidence,
				areaOfCurrentResidence: AddFamiliesForm.values.areaOfCurrentResidence,
				numberOfFamilyMembers: parseInt(
					AddFamiliesForm.values.numberOfFamilyMembers,
				),
				telephoneNumber: AddFamiliesForm.values.telephoneNumber,
				idNumber: parseInt(AddFamiliesForm.values.idNumber),
				lossesInWar: AddFamiliesForm.values.lossesInWar,
				currentSituation: AddFamiliesForm.values.currentSituation,
				numberOfMartyrInFamily: parseInt(
					AddFamiliesForm.values.numberOfMartyrInFamily,
				),
				numberOfInfectedInFamily: parseInt(
					AddFamiliesForm.values.numberOfInfectedInFamily,
				),
				familyMemberDetail: familyMembers,
			};
			try {
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
					<h3 className=" text-sm font-bold">Bread Winner Name</h3>
					<div className="flex items-start justify-start w-full gap-x-4">
						<div>
							<Input
								title={'In English *'}
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
								title={'In Turkish *'}
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
								title={'In Arabic *'}
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
							title={`${t('age.title')} *`}
							name="age"
							type="number"
							className="mb-[5px] min-w-[460px]"
							value={AddFamiliesForm.values?.age}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.age &&
								AddFamiliesForm.errors.age &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.errors.age && (
							<p className="text-sm mb-2 text-red">
								{AddFamiliesForm.touched.age &&
									(AddFamiliesForm.errors.age as any)}
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

				{/* third */}

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
						<Select
							title={`${t('gender.title')} *`}
							name="gender"
							options={[
								{ label: t('gender.male'), value: 'male' },
								{ label: t('gender.female'), value: 'female' },
							]}
							defaultValue={t('gender.default')}
							className="mb-[40px] min-w-[460px] mt-[2px] "
							value={AddFamiliesForm.values?.gender}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.gender &&
								AddFamiliesForm.errors.gender &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.gender &&
							AddFamiliesForm.errors.gender && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.gender as any}
								</p>
							)}
					</div>
				</div>

				{/* fourth */}

				<div className="flex items-start justify-start w-full mb-8 gap-x-4">
					<div>
						<Select
							title={`${t('martialstatus.title')} *`}
							name="maritalStatus"
							options={[
								{ label: t('martialstatus.single'), value: 'single' },
								{ label: t('martialstatus.married'), value: 'married' },
							]}
							defaultValue={t('martialstatus.default')}
							className={` ${AddFamiliesForm.errors.maritalStatus ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
							value={AddFamiliesForm.values?.maritalStatus}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.maritalStatus &&
								AddFamiliesForm.errors.maritalStatus &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.errors.maritalStatus && (
							<p className="text-sm mb-2 text-red">
								{AddFamiliesForm.touched.maritalStatus &&
									(AddFamiliesForm.errors.maritalStatus as any)}
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
							className={` ${AddFamiliesForm.errors.language ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
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

				{/* COMMENT  */}
				<div className=" flex flex-col gap-3">
					<h3 className=" text-sm font-bold">Comment</h3>
					<div className="flex items-start justify-start w-full gap-x-4">
						<Input
							title={'In English'}
							name="descriptionEn"
							className="mb-[10px] min-w-[250px]"
							value={AddFamiliesForm.values?.descriptionEn}
							onChange={AddFamiliesForm.handleChange}
						/>
						<Input
							title={'In Turkish'}
							name="descriptionTr"
							className="mb-[10px] min-w-[250px]"
							value={AddFamiliesForm.values?.descriptionTr}
							onChange={AddFamiliesForm.handleChange}
						/>
						<Input
							title={'In Arabic'}
							name="descriptionAr"
							className="mb-[10px] min-w-[250px]"
							value={AddFamiliesForm.values?.descriptionAr}
							onChange={AddFamiliesForm.handleChange}
						/>
					</div>
				</div>

				{/* fifth */}

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
							className={` ${AddFamiliesForm.errors.areaOfPreviousResidence ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
							value={AddFamiliesForm.values?.areaOfPreviousResidence}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.areaOfPreviousResidence &&
								AddFamiliesForm.errors.areaOfPreviousResidence &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.areaOfPreviousResidence &&
							AddFamiliesForm.errors.areaOfPreviousResidence && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.areaOfPreviousResidence as any}
								</p>
							)}
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
								{ label: t('currentresidence.KhanYunis'), value: 'Khan Yunis' },
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
							className={` ${AddFamiliesForm.errors.areaOfCurrentResidence ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
							value={AddFamiliesForm.values?.areaOfCurrentResidence}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.areaOfCurrentResidence &&
								AddFamiliesForm.errors.areaOfCurrentResidence &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.areaOfCurrentResidence &&
							AddFamiliesForm.errors.areaOfCurrentResidence && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.areaOfCurrentResidence as any}
								</p>
							)}
					</div>
				</div>

				{/* Sixth */}

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
							className={` ${AddFamiliesForm.errors.currentSituation ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
							value={AddFamiliesForm.values?.currentSituation}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.currentSituation &&
								AddFamiliesForm.errors.currentSituation &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.currentSituation &&
							AddFamiliesForm.errors.currentSituation && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.currentSituation as any}
								</p>
							)}
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
							className={` ${AddFamiliesForm.errors.lossesInWar ? 'mb-[40px]' : 'mb-[5px]'} min-w-[460px] mt-[2px]`}
							value={AddFamiliesForm.values.lossesInWar}
							onChange={AddFamiliesForm.handleChange}
							errorClass={
								AddFamiliesForm.touched.lossesInWar &&
								AddFamiliesForm.errors.lossesInWar &&
								'border-2 border-solid border-red'
							}
						/>
						{AddFamiliesForm.touched.lossesInWar &&
							AddFamiliesForm.errors.lossesInWar && (
								<p className="text-sm mb-2 text-red">
									{AddFamiliesForm.errors.lossesInWar as any}
								</p>
							)}
					</div>
				</div>

				{/* seventh */}

				<div className="flex items-start justify-start w-full gap-x-4">
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
											title={'In English'}
											name="inenglish"
											className="mb-[10px] min-w-[250px]"
											// value={updateProfileForm.values?.name}
											onChange={(e) =>
												handleMemberDetailChange(i, 'inEnglish', e.target.value)
											}
										/>
										<Input
											title={'In Arabic'}
											name="inarabic"
											className="mb-[10px] min-w-[250px]"
											// value={updateProfileForm.values?.email}
											onChange={(e) =>
												handleMemberDetailChange(i, 'inArabic', e.target.value)
											}
										/>
										<Input
											title={'In Turkish'}
											name="inturkish"
											className="mb-[10px] min-w-[250px]"
											// value={updateProfileForm.values?.email}
											onChange={(e) =>
												handleMemberDetailChange(i, 'inTurkish', e.target.value)
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

										<Select
											title={t('gender.title')}
											name="language"
											options={[
												{ label: t('gender.male'), value: 'male' },
												{ label: t('gender.female'), value: 'female' },
											]}
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
