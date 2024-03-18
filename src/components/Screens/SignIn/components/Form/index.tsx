'use client';
import React from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
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
						<div className="text-4xl font-extrabold text-primary mt-10 leading-normal pt-2">
							{t('title')}
						</div>
						<div className="text-xl font-semibold text-primary leading-normal pt-2 mb-8">
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
					<p className="text-primary w-full text-right text-lg font-bold">
						{t('forgot')}
					</p>

					<div className="justify-center items-center flex w-full">
						<Button
							title={t('submit')}
							className="min-w-[250px] text-base px-6"
							type="submit"
							isLoading={isLoading}
						/>
					</div>
				</div>
			</form>
			<div className="text-center text-primary w-full max-w-[800px] absolute bottom-12 text-lg justify-center items-center flex font-helvetica gap-x-4">
				{t('cta.0')}
				<Link locale={locale} className="text-primary font-bold" href={url('/become-sponsor')}>
					{t('cta.1')}
				</Link>
			</div>
		</>
	);
};

export default Form;
