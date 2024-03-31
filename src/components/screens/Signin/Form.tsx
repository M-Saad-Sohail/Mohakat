'use client';
import React from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useFormik } from 'formik';
import { LOGININITIALVALUES } from '@/contants';
import { loginSchema } from '@/utils/validationSchema';
import { UserCredentials } from '@/types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';

type IProps = {
	submitHandler: (arg: UserCredentials) => void;
	isLoading: boolean;
};

const Form = ({ submitHandler, isLoading }: IProps) => {
	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: LOGININITIALVALUES, // Corrected constant name
		validationSchema: loginSchema,
		onSubmit: (values: UserCredentials) => {
			submitHandler({ ...values, email: values.email.toLowerCase() });
		},
	});

	const t = useTranslations('Signin.form');
	const { url, locale } = useLocaleRouter();

	return (
		<>
			<form
				className="w-full my-[200px] max-w-[800px]"
				noValidate
				onSubmit={handleSubmit}
			>
				<div className="mx-4 my-10 space-y-5">
					<div>
						<div className="pt-2 mt-10 text-4xl font-extrabold leading-normal text-primary">
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
					<p className="text-primary w-full text-right text-[12px] font-bold">
						{t('forgot')}
					</p>

					<div className="flex items-center justify-center w-full">
						<Button
							title={t('submit')}
							className="max-w-[200px] text-base px-6"
							type="submit"
							isLoading={isLoading}
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
