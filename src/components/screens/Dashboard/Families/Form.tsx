'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/components/ui//Input';
import { ResetPassword } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import Select from '@/components/ui/Select';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useDirection from '@/hooks/useDirection';
import { AddFamiliesValues } from '@/contants';
import { useFormik, ErrorMessage } from 'formik';
import Button from '@/components/ui/Button';
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
			] = value as string;
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
			console.log("testinggg",familyMembers)
			console.log("test",AddFamiliesForm.values.breadWinnerNameEn)
			const response = {
				breadWinnerName: {
					inEnglish: AddFamiliesForm.values.breadWinnerNameEn,
					inTurkish: AddFamiliesForm.values.breadWinnerNameTr,
					inArabic: AddFamiliesForm.values.breadWinnerNameAr,
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
				numberOfFamilyMembers: parseInt(AddFamiliesForm.values.numberOfFamilyMembers),
				telephoneNumber: AddFamiliesForm.values.telephoneNumber,
				idNumber: parseInt(AddFamiliesForm.values.idNumber),
				lossesInWar: AddFamiliesForm.values.lossesInWar,
				currentSituation: AddFamiliesForm.values.currentSituation,
				numberOfMartyrInFamily: parseInt(AddFamiliesForm.values.numberOfMartyrInFamily),
				numberOfInfectedInFamily: parseInt(AddFamiliesForm.values.numberOfInfectedInFamily),
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
					// AddFamiliesForm.resetForm();
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
					<div className="flex items-center justify-start w-full gap-x-4">
						<Input
							title={'In English'}
							name="breadWinnerNameEn"
							className="mb-[19px] min-w-[250px]"
							value={AddFamiliesForm.values?.breadWinnerNameEn}
							onChange={AddFamiliesForm.handleChange}
						/>
						{AddFamiliesForm.touched.breadWinnerNameEn &&
							Boolean(AddFamiliesForm.errors.breadWinnerNameEn) &&
							toast.error(
								`${AddFamiliesForm.errors.breadWinnerNameEn as any}`,
								{
									toastId: '',
									position: 'bottom-right',
									autoClose: 4000,
								},
							)}
						<Input
							title={'In Turkish'}
							name="breadWinnerNameTr"
							className="mb-[19px] min-w-[250px]"
							value={AddFamiliesForm.values?.breadWinnerNameTr}
							onChange={AddFamiliesForm.handleChange}
						/>
						{AddFamiliesForm.touched.breadWinnerNameTr &&
							Boolean(AddFamiliesForm.errors.breadWinnerNameTr) &&
							toast.error(
								`${AddFamiliesForm.errors.breadWinnerNameTr as any}`,
								{
									toastId: '',
									position: 'bottom-right',
									autoClose: 4000,
								},
							)}
						<Input
							title={'In Arabic'}
							name="breadWinnerNameAr"
							className="mb-[19px] min-w-[250px]"
							value={AddFamiliesForm.values?.breadWinnerNameAr}
							onChange={AddFamiliesForm.handleChange}
						/>
						{AddFamiliesForm.touched.breadWinnerNameAr &&
							Boolean(AddFamiliesForm.errors.breadWinnerNameAr) &&
							toast.error(
								`${AddFamiliesForm.errors.breadWinnerNameAr as any}`,
								{
									toastId: '',
									position: 'bottom-right',
									autoClose: 4000,
								},
							)}
					</div>
				</div>

				

				{/* second */}

				<div className="flex items-center justify-start w-full gap-x-4">
					<Input
						title={t('email.title')}
						name="email"
						className="mb-[19px] min-w-[460px]"
						value={AddFamiliesForm.values?.email}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.email &&
						Boolean(AddFamiliesForm.errors.email) &&
						toast.error(`${AddFamiliesForm.errors.email as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
					<Input
						title={t('age.title')}
						name="age"
						type="number"
						className="mb-[19px] min-w-[460px]"
						value={AddFamiliesForm.values?.age}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.age &&
						Boolean(AddFamiliesForm.errors.age) &&
						toast.error(`${AddFamiliesForm.errors.age as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
				</div>

				<div className="flex items-center justify-start w-full gap-x-4">
					<Input
						title={t('telephone.title')}
						name="telephoneNumber"
						type="number"
						className="mb-[19px] min-w-[460px]"
						value={AddFamiliesForm.values?.telephoneNumber}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.telephoneNumber &&
						Boolean(AddFamiliesForm.errors.telephoneNumber) &&
						toast.error(`${AddFamiliesForm.errors.telephoneNumber as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
					<Input
						title={t('id.title')}
						name="idNumber"
						type="number"
						className="mb-[19px] min-w-[460px]"
						value={AddFamiliesForm.values?.idNumber}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.idNumber &&
						Boolean(AddFamiliesForm.errors.idNumber) &&
						toast.error(`${AddFamiliesForm.errors.idNumber as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
				</div>

				{/* third */}

				<div className="flex items-center justify-start w-full gap-x-4">
					<Input
						title={t('dob.title')}
						name="dateOfBirth"
						className="mb-[19px] min-w-[460px] "
						type="date"
						value={AddFamiliesForm.values?.dateOfBirth}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.dateOfBirth &&
						Boolean(AddFamiliesForm.errors.dateOfBirth) &&
						toast.error(`${AddFamiliesForm.errors.dateOfBirth as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
					<Select
						title={t('gender.title')}
						name="gender"
						options={[
							{ label: t('gender.male'), value: 'male' },
							{ label: t('gender.female'), value: 'female' },
						]}
						defaultValue={t('gender.default')}
						className="mb-[60px] min-w-[460px] "
						value={AddFamiliesForm.values?.gender}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.gender &&
						Boolean(AddFamiliesForm.errors.gender) &&
						toast.error(`${AddFamiliesForm.errors.gender as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
				</div>

				{/* fourth */}

				<div className="flex justify-start w-full mb-8 gap-x-4">
					<Select
						title={t('martialstatus.title')}
						name="maritalStatus"
						options={[
							{ label: t('martialstatus.single'), value: 'single' },
							{ label: t('martialstatus.married'), value: 'married' },
						]}
						defaultValue={t('martialstatus.default')}
						className="mb-[19px] min-w-[460px] mt-[2px]"
						value={AddFamiliesForm.values?.maritalStatus}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.maritalStatus &&
						Boolean(AddFamiliesForm.errors.maritalStatus) &&
						toast.error(`${AddFamiliesForm.errors.maritalStatus as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
					<Select
						title={t('language.title')}
						name="language"
						options={[
							{ label: t('language.english'), value: 'en' },
							{ label: t('language.arabic'), value: 'ar' },
							{ label: t('language.turkish'), value: 'tr' },
						]}
						defaultValue={t('language.default')}
						className="mb-[19px] min-w-[460px] mt-[2px]"
						value={AddFamiliesForm.values.language}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.language &&
						Boolean(AddFamiliesForm.errors.language) &&
						toast.error(`${AddFamiliesForm.errors.language as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
				</div>

				<div className=" flex flex-col gap-3">
					<h3 className=" text-sm font-bold">Comment</h3>
					<div className="flex items-center justify-start w-full gap-x-4">
						<Input
							title={'In English'}
							name="descriptionEn"
							className="mb-[19px] min-w-[250px]"
							value={AddFamiliesForm.values?.descriptionEn}
							onChange={AddFamiliesForm.handleChange}
						/>
						{AddFamiliesForm.touched.descriptionEn &&
							Boolean(AddFamiliesForm.errors.descriptionEn) &&
							toast.error(`${AddFamiliesForm.errors.descriptionEn as any}`, {
								toastId: '',
								position: 'bottom-right',
								autoClose: 4000,
							})}
						<Input
							title={'In Turkish'}
							name="descriptionTr"
							className="mb-[19px] min-w-[250px]"
							value={AddFamiliesForm.values?.descriptionTr}
							onChange={AddFamiliesForm.handleChange}
						/>
						{AddFamiliesForm.touched.descriptionTr &&
							Boolean(AddFamiliesForm.errors.descriptionTr) &&
							toast.error(`${AddFamiliesForm.errors.descriptionTr as any}`, {
								toastId: '',
								position: 'bottom-right',
								autoClose: 4000,
							})}
						<Input
							title={'In Arabic'}
							name="descriptionAr"
							className="mb-[19px] min-w-[250px]"
							value={AddFamiliesForm.values?.descriptionAr}
							onChange={AddFamiliesForm.handleChange}
						/>
						{AddFamiliesForm.touched.descriptionAr &&
							Boolean(AddFamiliesForm.errors.descriptionAr) &&
							toast.error(`${AddFamiliesForm.errors.descriptionAr as any}`, {
								toastId: '',
								position: 'bottom-right',
								autoClose: 4000,
							})}
					</div>
				</div>

				{/* fifth */}

				<div className="flex justify-start w-full mb-8 gap-x-4">
					<Select
						title={t('previousresidence.title')}
						name="areaOfPreviousResidence"
						options={[
							{ label: t('previousresidence.Gaza'), value: 'Gaza' },
							{
								label: t('previousresidence.JabaliaCamp'),
								value: 'Jabalia Camp',
							},
							{ label: t('previousresidence.KhanYunis'), value: 'Khan Yunis' },
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
						className=" mb-[19px] min-w-[460px] mt-[2px]"
						value={AddFamiliesForm.values?.areaOfPreviousResidence}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.areaOfPreviousResidence &&
						Boolean(AddFamiliesForm.errors.areaOfPreviousResidence) &&
						toast.error(
							`${AddFamiliesForm.errors.areaOfPreviousResidence as any}`,
							{
								toastId: '',
								position: 'bottom-right',
								autoClose: 4000,
							},
						)}
					<Select
						title={t('currentresidence.title')}
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
							{ label: t('currentresidence.BureijCamp'), value: 'Bureij Camp' },
							{
								label: t('currentresidence.AlShatiCamp'),
								value: 'Al-Shati Camp',
							},
						]}
						defaultValue={t('currentresidence.default')}
						className=" mb-[19px] min-w-[460px] mt-[2px]"
						value={AddFamiliesForm.values?.areaOfCurrentResidence}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.areaOfCurrentResidence &&
						Boolean(AddFamiliesForm.errors.areaOfCurrentResidence) &&
						toast.error(
							`${AddFamiliesForm.errors.areaOfCurrentResidence as any}`,
							{
								toastId: '',
								position: 'bottom-right',
								autoClose: 4000,
							},
						)}
				</div>

				{/* Sixth */}

				<div className="flex justify-start w-full mb-8 gap-x-4">
					<Select
						title={t('currentsituation.title')}
						name="currentSituation"
						options={[
							{ label: t('currentsituation.good'), value: 'Good' },
							{ label: t('currentsituation.bad'), value: 'Bad' },
							{ label: t('currentsituation.worst'), value: 'Worst' },
						]}
						defaultValue={t('currentsituation.default')}
						className=" mb-[19px] min-w-[460px] mt-[2px]"
						value={AddFamiliesForm.values?.currentSituation}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.currentSituation &&
						Boolean(AddFamiliesForm.errors.currentSituation) &&
						toast.error(`${AddFamiliesForm.errors.currentSituation as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
					<Select
						title={t('losesinwar.title')}
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
						className=" mb-[19px] min-w-[460px] mt-[2px]"
						value={AddFamiliesForm.values.lossesInWar}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.lossesInWar &&
						Boolean(AddFamiliesForm.errors.lossesInWar) &&
						toast.error(`${AddFamiliesForm.errors.lossesInWar as any}`, {
							toastId: '',
							position: 'bottom-right',
							autoClose: 4000,
						})}
				</div>

				{/* seventh */}

				<div className="flex items-center justify-start w-full gap-x-4">
					<Input
						title={t('FamilyMembers.title')}
						name="numberOfFamilyMembers"
						type="number"
						className="mb-[19px] min-w-[300px]"
						value={AddFamiliesForm.values?.numberOfFamilyMembers}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.numberOfFamilyMembers &&
						Boolean(AddFamiliesForm.errors.numberOfFamilyMembers) &&
						toast.error(
							`${AddFamiliesForm.errors.numberOfFamilyMembers as any}`,
							{
								toastId: '',
								position: 'bottom-right',
								autoClose: 4000,
							},
						)}
					<Input
						title={t('MartyrInFamily.title')}
						name="numberOfMartyrInFamily"
						type="number"
						className="mb-[19px] min-w-[300px]"
						value={AddFamiliesForm.values?.numberOfMartyrInFamily}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.numberOfMartyrInFamily &&
						Boolean(AddFamiliesForm.errors.numberOfMartyrInFamily) &&
						toast.error(
							`${AddFamiliesForm.errors.numberOfMartyrInFamily as any}`,
							{
								toastId: '',
								position: 'bottom-right',
								autoClose: 4000,
							},
						)}
					<Input
						title={t('InfectedInFamily.title')}
						name="numberOfInfectedInFamily"
						type="number"
						className="mb-[19px] min-w-[300px]"
						value={AddFamiliesForm.values?.numberOfInfectedInFamily}
						onChange={AddFamiliesForm.handleChange}
					/>
					{AddFamiliesForm.touched.numberOfInfectedInFamily &&
						Boolean(AddFamiliesForm.errors.numberOfInfectedInFamily) &&
						toast.error(
							`${AddFamiliesForm.errors.numberOfInfectedInFamily as any}`,
							{
								toastId: '',
								position: 'bottom-right',
								autoClose: 4000,
							},
						)}
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
											className="mb-[19px] min-w-[400px] "
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
											className="mb-[19px] min-w-[400px] "
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
											className="mb-[60px] min-w-[400px] "
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
						title={t('title')}
						type='submit'
						className="max-w-[200px] px-6 shadow-custom"
						isLoading={loading}
						onClick={(e) => {
							e.preventDefault();
							AddFamiliesForm.handleSubmit();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default FamilyForm;
