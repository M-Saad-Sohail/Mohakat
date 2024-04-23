'use client';
import React from 'react';
import Input from '@/components/ui/Input';
// import Button from '@/components/ui/Button';
import Button from '@/components/ui/LandingPage/Button';
import { useFormik } from 'formik';
import { resendOtpSchema } from '@/utils/validationSchema';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import { useSearchParams } from 'next/navigation';

type IProps = {
	submitHandler: (email: string) => Promise<boolean>;
	isLoading: boolean;
	fromGazaMap: boolean;
};

const Form = ({ submitHandler, isLoading, fromGazaMap }: IProps) => {
	const { url, replace } = useLocaleRouter();
	const params = useSearchParams();

	const getLink = () => {
		const queryParams: Record<string, string> = {};
		if (fromGazaMap) {
			queryParams['from'] = 'gaza_map';
		}
		let link = PATHS.VERIFY_OTP;
		if (Object.keys(queryParams).length > 0) {
			let hashedQuery = Object.keys(queryParams)
				.map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
				.join('&');
			link += `?${hashedQuery}`;
		}
		return link;
	};

	const onSubmit = async (values: { email: string }) => {
		const success = await submitHandler(values.email);
		if (!success || !params) return;
		replace(getLink());
	};

	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: {
			email: '',
		}, // Corrected constant name
		validationSchema: resendOtpSchema,
		onSubmit,
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
						type="submit"
						isLoading={isLoading}
						className="w-56"
						Color="#CF7475"
					/>
				</div>
			</div>
		</form>
	);
};

export default Form;
