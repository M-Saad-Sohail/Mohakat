'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/components/ui//Input';
import { ResetPassword } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import Select from '@/components/ui/Select';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useDirection from '@/hooks/useDirection';
import { AddFamiliesValues } from '@/contants';
import { useFormik } from 'formik';
import Button from '@/components/ui/Button';
import { postJson } from '@/api/api.instances';
import useLoggedInUser from '@/hooks/useLoggedInUser';

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
	MemberIdNumber: string | '';
	memberGender: string;
}

const FamilyForm = () => {
	const [userId, setUserId] = useState<string | null>(null);
	const [familyMembers, setFamilyMembers] = useState<any[]>([]);
	const { user } = useLoggedInUser();

	const handleMemberDetailChange = (
		index: any,
		key: string,
		value: string | number,
	) => {
		console.log(index);
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

	useEffect(() => {
		console.log('jj', familyMembers);
	}, [familyMembers]);

	const t = useTranslations('AddFamilies.form');
	const dir = useDirection();
	const { changeLocale } = useLocaleRouter();

	const AddFamiliesForm = useFormik({
		initialValues: AddFamiliesValues,
		// validationSchema: updateProfileSchema,
		onSubmit: async (values: any) => {
			const response = {
				breadWinnerName: {
					inEnglish: values.breadWinnerNameEn,
					inTurkish: values.breadWinnerNameTr,
					inArabic: values.breadWinnerNameAr,
				},
				maritalStatus: values.maritalStatus,
				email: values.email,
				language: values.language,
				gender: values.gender,
				age: values.age,
				dateOfBirth: values.dateOfBirth,
				areaOfPreviousResidence: values.areaOfPreviousResidence,
				areaOfCurrentResidence: values.areaOfCurrentResidence,
				numberOfFamilyMembers: parseInt(values.numberOfFamilyMembers),
				telephoneNumber: values.telephoneNumber,
				idNumber: parseInt(values.idNumber),
				lossesInWar: values.lossesInWar,
				currentSituation: values.currentSituation,
				numberOfMartyrInFamily: parseInt(values.numberOfMartyrInFamily),
				numberOfInfectedInFamily: parseInt(values.numberOfInfectedInFamily),
				familyMemberDetail: familyMembers,
			};

			try {
				const res = await postJson(
					`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/admin-family-register`,
					response,
					user?.key,
				);
				if (res.success) {
					alert('done');
				}
			} catch (error) {
				console.log(error);
			}

			console.log('form submitted', response);
		},
	});

	return (
		<div
			className=" scrollbarHide"
			// dir={dir} // Set form overflow to auto
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
						<Input
							title={'In Arabic'}
							name="breadWinnerNameTr"
							className="mb-[19px] min-w-[250px]"
							value={AddFamiliesForm.values?.breadWinnerNameTr}
							onChange={AddFamiliesForm.handleChange}
						/>
						<Input
							title={'In Turkish'}
							name="breadWinnerNameAr"
							className="mb-[19px] min-w-[250px]"
							value={AddFamiliesForm.values?.breadWinnerNameAr}
							onChange={AddFamiliesForm.handleChange}
						/>
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
					<Input
						title={t('age.title')}
						name="age"
						className="mb-[19px] min-w-[460px]"
						value={AddFamiliesForm.values?.age}
						onChange={AddFamiliesForm.handleChange}
					/>
				</div>

				<div className="flex items-center justify-start w-full gap-x-4">
					<Input
						title={t('telephone.title')}
						name="telephoneNumber"
						className="mb-[19px] min-w-[460px]"
						value={AddFamiliesForm.values?.telephoneNumber}
						onChange={AddFamiliesForm.handleChange}
					/>
					<Input
						title={t('id.title')}
						name="idNumber"
						className="mb-[19px] min-w-[460px]"
						value={AddFamiliesForm.values?.idNumber}
						onChange={AddFamiliesForm.handleChange}
					/>
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
					<Select
						title={t('losesinwar.title')}
						name="lossesInWar"
						options={[
							{ label: t('losesinwar.none'), value: 'none' },
							{ label: t('losesinwar.1'), value: '1' },
							{ label: t('losesinwar.2'), value: '2' },
							{ label: t('losesinwar.3'), value: '3' },
							// Add more entries till 30
							{ label: t('losesinwar.4'), value: '4' },
							{ label: t('losesinwar.5'), value: '5' },
							{ label: t('losesinwar.6'), value: '6' },
							{ label: t('losesinwar.7'), value: '7' },
							{ label: t('losesinwar.8'), value: '8' },
							{ label: t('losesinwar.9'), value: '9' },
							{ label: t('losesinwar.10'), value: '10' },
							{ label: t('losesinwar.11'), value: '11' },
							{ label: t('losesinwar.12'), value: '12' },
							{ label: t('losesinwar.13'), value: '13' },
							{ label: t('losesinwar.14'), value: '14' },
							{ label: t('losesinwar.15'), value: '15' },
							{ label: t('losesinwar.16'), value: '16' },
							{ label: t('losesinwar.17'), value: '17' },
							{ label: t('losesinwar.18'), value: '18' },
							{ label: t('losesinwar.19'), value: '19' },
							{ label: t('losesinwar.20'), value: '20' },
							{ label: t('losesinwar.21'), value: '21' },
							{ label: t('losesinwar.22'), value: '22' },
							{ label: t('losesinwar.23'), value: '23' },
							{ label: t('losesinwar.24'), value: '24' },
							{ label: t('losesinwar.25'), value: '25' },
							{ label: t('losesinwar.26'), value: '26' },
							{ label: t('losesinwar.27'), value: '27' },
							{ label: t('losesinwar.28'), value: '28' },
							{ label: t('losesinwar.29'), value: '29' },
							{ label: t('losesinwar.30'), value: '30' },
						]}
						defaultValue={t('losesinwar.default')}
						className=" mb-[19px] min-w-[460px] mt-[2px]"
						value={AddFamiliesForm.values.lossesInWar}
						onChange={AddFamiliesForm.handleChange}
					/>
				</div>

				{/* seventh */}

				<div className="flex items-center justify-start w-full gap-x-4">
					<Input
						title={t('FamilyMembers.title')}
						name="numberOfFamilyMembers"
						className="mb-[19px] min-w-[300px]"
						value={AddFamiliesForm.values?.numberOfFamilyMembers}
						onChange={AddFamiliesForm.handleChange}
					/>
					<Input
						title={t('MartyrInFamily.title')}
						name="numberOfMartyrInFamily"
						className="mb-[19px] min-w-[300px]"
						value={AddFamiliesForm.values?.numberOfMartyrInFamily}
						onChange={AddFamiliesForm.handleChange}
					/>
					<Input
						title={t('InfectedInFamily.title')}
						name="numberOfInfectedInFamily"
						className="mb-[19px] min-w-[300px]"
						value={AddFamiliesForm.values?.numberOfInfectedInFamily}
						onChange={AddFamiliesForm.handleChange}
					/>
				</div>

				{/* eigth */}
				{AddFamiliesForm.values.numberOfFamilyMembers && (
					<div className=" flex flex-col gap-3">
						<h3 className=" text-sm font-bold">Family Member Details</h3>
						{[
							...Array(parseInt(AddFamiliesForm.values.numberOfFamilyMembers)),
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
										type="text"
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
						title={'Submit'}
						className="max-w-[200px] px-6 shadow-custom"
						disabled={AddFamiliesForm.isSubmitting}
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
