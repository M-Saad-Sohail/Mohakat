'use client';
import React from 'react';
import Input from '@/components/ui/Input';
// import Button from '@/components/ui/Button';
import Button from '@/components/ui/LandingPage/Button';
import Link from 'next/link';
import { useFormik } from 'formik';
import { LOGININITIALVALUES, PATHS } from '@/contants';
import { loginSchema } from '@/utils/validationSchema';
import { FamilyCredentials } from '@/types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { FamilyType } from '@/state/user/types';
import FamilyNotVerifiedError from '@/errors/FamilyNotVerifiedError';
import { useRouter } from 'next/navigation';
import Heading from '@/components/ui/Heading/Heading';

type IProps = {
	submitHandler: (arg: FamilyCredentials) => Promise<FamilyType | null>;
	isLoading: boolean;
};

const Form = ({ submitHandler, isLoading }: IProps) => {
	const { url, locale, redirect, redirectWithLocale } = useLocaleRouter();
	const router = useRouter();

	const onSubmit = async (values: FamilyCredentials) => {
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
			if (error instanceof FamilyNotVerifiedError) {
				redirectWithLocale(locale, PATHS.FAMILY_RESENT_OTP);
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
				className="w-full my-[100px] max-w-[800px] animated-div"
				noValidate
				onSubmit={handleSubmit}
			>
				<div className="mx-4 space-y-5">
					<div>
						<div className="flex flex-col justify-center items-center">
							<Heading heading={t("familySignIn")} className="main_heading-black" />
						</div>
						<div className="pt-2 mb-8 text-lg font-semibold leading-normal text-[#36454F] text-center">
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
					<Link href={url('/forgot-password-family')}>
						<p className="text-black hover:text-[#CF7475] w-full text-right text-[12px] mt-5 font-bold">
							{t('forgot')}
						</p>
					</Link>

					<div className="flex items-center justify-center w-full">
						<Button
							title={t('submit')}
							type="submit"
							isLoading={isLoading}
							className="w-56"
							Color="#CF7475"
						/>
					</div>
				</div>
			</form>
			<div className="text-center text-[#CF7475] font-bold w-full max-w-[800px] absolute bottom-[3%] text-base justify-center items-center flex font-helvetica gap-x-3">
				{t('cta.0')}
				<Link
					locale={locale}
					className="font-bold text-black hover:text-[#CF7475]"
					href={url('/become-sponsor')}
				>
					{t('cta.1')}
				</Link>

				<Link
					locale={locale}
					className="font-bold text-black hover:text-[#CF7475]"
					href={url('/sign-in')}
					style={{ color: "#CF7475" }}
				>
					{t("title1")}
				</Link>
			</div>
		</>
	);
};

export default Form;
