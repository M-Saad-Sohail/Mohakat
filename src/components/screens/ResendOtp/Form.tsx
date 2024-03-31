'use client';
import React from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useFormik } from 'formik';
import { resendOtpSchema } from '@/utils/validationSchema';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';

type IProps = {
	submitHandler: (email: string) => Promise<boolean>;
	isLoading: boolean;
};

const Form = ({ submitHandler, isLoading }: IProps) => {
	const { url } = useLocaleRouter();
	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: {
			email: '',
		}, // Corrected constant name
		validationSchema: resendOtpSchema,
		onSubmit: async (values: { email: string }, { resetForm }) => {
			const success = await submitHandler(values.email);
			if (!success) return
			window.location.href = url(PATHS.VERIFY_OTP)
		},
	});

	const t = useTranslations('ResendOtp.form');

	return (
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
				</div>
				<Input
					title={t('email.title')}
					placeholder={t('email.placeholder')}
					name="email"
					type="text" // Added type attribute
					onChange={handleChange}
					value={values.email}
					error={touched.email && errors.email}
					className="max-w-[800px]"
				/>
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
	);
};

export default Form;
