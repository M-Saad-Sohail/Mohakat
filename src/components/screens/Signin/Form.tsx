'use client';
import React from 'react';
import Input from '@/components/ui/Input';
// import Button from '@/components/ui/Button';
import Button from '@/components/ui/LandingPage/Button';
import Link from 'next/link';
import { useFormik } from 'formik';
import { LOGININITIALVALUES, PATHS } from '@/contants';
import { loginSchema } from '@/utils/validationSchema';
import { UserCredentials } from '@/types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { UserType } from '@/state/user/types';
import UserNotVerifiedError from '@/errors/UserNotVerifiedError';

type IProps = {
	submitHandler: (arg: UserCredentials) => Promise<UserType | null>;
	isLoading: boolean;
};

const Form = ({ submitHandler, isLoading }: IProps) => {
	const { url, locale, redirect, redirectWithLocale } = useLocaleRouter();

	const onSubmit = async (values: UserCredentials) => {
		try {
			const user = await submitHandler({
				...values,
				email: values.email.toLowerCase(),
			});
			if (!user) return;
			let locale = 'en';
			if (['en', 'ar', 'tr'].includes(user.language)) {
				locale = user.language;
			}
			redirectWithLocale(locale, PATHS.DASHBOARD);
		} catch (error) {
			if (error instanceof UserNotVerifiedError) {
				return redirect(PATHS.RESEND_OTP);
			}
		}
	};

	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: LOGININITIALVALUES, // Corrected constant name
		validationSchema: loginSchema,
		onSubmit,
	});

	const t = useTranslations('Signin.form');

	return (
		<>
			<form
				className="w-full my-[100px] max-w-[800px]"
				noValidate
				onSubmit={handleSubmit}
			>
				<div className="mx-4 space-y-5">
					<div>
						<div className="pt-2 text-4xl font-extrabold leading-normal text-primary">
							{t('title')}
						</div>
						<div className="pt-2 mb-8 text-xl font-semibold leading-normal text-primary">
							{t('description')}
						</div>
					</div>
					<Input
						title={t('email.title')}
						placeholder={t('email.placeholder')}
						type="email"
						name="email"
						onChange={handleChange}
						value={values.email}
						error={touched.email && errors.email}
						className="mb-[19px] max-w-[800px]"
					/>
					<Input
						title={t('password.title')}
						placeholder="*************"
						name="password"
						type="password" // Added type attribute
						onChange={handleChange}
						value={values.password}
						error={touched.password && errors.password}
						className="max-w-[800px]"
					/>
					<Link href={url('')}>
						<p className="text-primary w-full text-right text-[12px] font-bold">
							{t('forgot')}
						</p>
					</Link>

					<div className="flex items-center justify-center w-full">
						<Button
							title={t('submit')}
							type="submit"
							isLoading={isLoading}
							className=" bg-[#CF7475] w-56"
						/>
					</div>
				</div>
			</form>
			<div className="text-center text-primary w-full max-w-[800px] absolute bottom-[3%] text-lg justify-center items-center flex font-helvetica gap-x-4">
				{t('cta.0')}
				<Link
					locale={locale}
					className="font-bold text-primary"
					href={url('/become-sponsor')}
				>
					{t('cta.1')}
				</Link>
			</div>
		</>
	);
};

export default Form;
