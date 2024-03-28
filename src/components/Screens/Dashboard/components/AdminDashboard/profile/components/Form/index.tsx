'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/components/UI//Input';
import Button from '@/components/UI/Button';
import Link from 'next/link';
import { useFormik } from 'formik';
import { PATHS, ProfileValues, RESETINITIALVALUES } from '@/contants';
import {
	resetPasswordSchema,
	updateProfileSchema,
} from '@/utils/validationSchema';
import { getUserFromLocalStorage } from '@/utils/auth';
import {
	ResetPasswordSchema,
	RegisterUserCredentials,
	UpdateProfileSchema,
} from '@/types';
import { useIntl } from 'react-intl';
import { UserType } from '@/state/user/types';
import Image from 'next/image';
import { profile } from '@/assests';
import { ResetPassword } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import Select from '@/components/UI/Select';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useDirection from '@/hooks/useDirection';
import { countriesData } from '@/contants/countries';

type IProps = {
	submitHandler: (arg: ResetPassword, id: String | undefined) => void;
	isLoading: boolean;
};

const SettingForm = ({ submitHandler, isLoading }: IProps) => {
	const [userId, setUserId] = useState<string | null>(null);

	const t = useTranslations('AccountSettings.form');
	const dir = useDirection();
	const { changeLocale } = useLocaleRouter();

	const changePasswordForm = useFormik({
		initialValues: RESETINITIALVALUES,
		validationSchema: resetPasswordSchema,
		onSubmit: (values: ResetPasswordSchema) => {
			if (!userId) return;
			submitHandler(
				{
					oldPassword: values.password,
					confirmPassword: values.new_password2,
					newPassword: values.new_password1,
				},
				userId,
			);
		},
	});

	const updateProfileForm = useFormik({
		initialValues: ProfileValues,
		validationSchema: updateProfileSchema,
		onSubmit: (values: UpdateProfileSchema) => {
			// change locale
			changeLocale(values.language);
		},
	});

	const { replace } = useLocaleRouter();

	useEffect(() => {
		const data = getUserFromLocalStorage();
		if (!data) {
			replace(PATHS.LOGIN);
			return;
		}
		updateProfileForm.setValues({
			name: data.name,
			email: data.email,
			country: data?.country ?? '',
			language: data.language ?? 'en',
		});
		setUserId(data.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className="w-full"
			dir={dir} // Set form overflow to auto
		>
			<div className="mx-4">
				<h2 className="text-[24px] font-bold text-main mt-2 leading-normal pt-2">
					{t('title')}
				</h2>
				<div className="mt-2">
					<h2 className="text-[16px] font-bold text-main my-6 leading-normal pt-2">
						{t('section1')}
					</h2>
				</div>
				<div className="flex items-center justify-start w-full gap-x-4">
					<Input
						title={t('name.title')}
						name="name"
						className="mb-[19px] min-w-[460px]"
						value={updateProfileForm.values?.name}
						onChange={updateProfileForm.handleChange}
					/>
					<Input
						title={t('email.title')}
						name="email"
						className="mb-[19px] min-w-[460px]"
						value={updateProfileForm.values?.email}
						onChange={updateProfileForm.handleChange}
					/>
				</div>
				<div className="flex justify-start w-full mb-8 gap-x-4">
					<Select
						title={t('country.title')}
						name="country"
						defaultValue={t('country.default')}
						options={countriesData.map((c) => ({
							value: c.code,
							label: c.name,
						}))}
						className="mb-[19px] min-w-[460px]"
						value={updateProfileForm.values.country}
						onChange={updateProfileForm.handleChange}
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
						value={updateProfileForm.values.language}
						className="min-w-[460px] mt-[2px]"
						onChange={updateProfileForm.handleChange}
					/>
				</div>
				<Button
					title={t('update_profile')}
					className="max-w-[200px] px-6  shadow-custom"
					disabled={updateProfileForm.isSubmitting}
					onClick={(e) => {
						e.preventDefault();
						updateProfileForm.handleSubmit(e as any);
					}}
				/>
				<h4 className="text-[16px] font-bold text-mmain my-5 mt-12 leading-normal pt-2">
					{t('section2')}
				</h4>
				<Input
					title={t('currentPassword.title')}
					placeholder="*"
					name="password"
					type="password"
					value={changePasswordForm.values.password}
					onChange={changePasswordForm.handleChange}
					error={
						changePasswordForm.errors.password &&
						changePasswordForm.touched.password
					}
					className="max-w-[935px] mb-[19px]"
				/>
				<Input
					title={t('newPassword.title')}
					placeholder="*"
					name="new_password1"
					type="password"
					onChange={changePasswordForm.handleChange}
					value={changePasswordForm.values.new_password1}
					error={
						changePasswordForm.touched.new_password1 &&
						changePasswordForm.errors.new_password1
					}
					className="max-w-[935px] mb-[19px]"
				/>
				<Input
					title={t('confirmPassword.title')}
					placeholder="*"
					name="new_password2"
					type="password"
					onChange={changePasswordForm.handleChange}
					value={changePasswordForm.values.new_password2}
					error={
						changePasswordForm.touched.new_password2 &&
						changePasswordForm.errors.new_password2
					}
					className="max-w-[935px] mb-[19px]"
				/>

				<div className="flex my-5">
					<Button
						title={t('save_changes')}
						className="max-w-[200px] px-6 shadow-custom"
						disabled={changePasswordForm.isSubmitting}
						onClick={(e) => {
							e.preventDefault();
							changePasswordForm.handleSubmit(e as any);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default SettingForm;