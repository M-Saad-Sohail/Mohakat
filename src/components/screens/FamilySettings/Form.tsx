'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/components/ui//Input';
// import Button from '@/components/ui/Button';
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
import Select from '@/components/ui/Select';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useDirection from '@/hooks/useDirection';
import { countriesData } from '@/contants/countries';
import Button from '@/components/ui/LandingPage/Button';

type IProps = {
	updatePassword: (arg: ResetPassword, id: String | undefined) => void;
	isLoading: boolean;
};

const SettingForm = ({ updatePassword, isLoading }: IProps) => {
	const [userId, setUserId] = useState<string | null>(null);

	const t = useTranslations('AccountSettings.form');
	const dir = useDirection();
	const { changeLocale } = useLocaleRouter();

	const changePasswordForm = useFormik({
		initialValues: RESETINITIALVALUES,
		validationSchema: resetPasswordSchema,
		onSubmit: (values: ResetPasswordSchema) => {
			if (!userId) return;
			updatePassword(
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
			changeLocale(values.language);
		},
	});

	const { replace } = useLocaleRouter();

	useEffect(() => {
		const data = getUserFromLocalStorage();
		if (!data) {
			replace(PATHS.LOGIN_FAMILY);
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
						onClick={(e:any) => {
							e.preventDefault();
							changePasswordForm.handleSubmit();
						}}
						className="max-w-[200px] px-6 shadow-custom"
						disabled={changePasswordForm.isSubmitting}
						title={t('save_changes')}
						Color="#CF7475"
					/>
				</div>
			</div>
	);
};

export default SettingForm;
