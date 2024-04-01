'use client';
import React from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useFormik } from 'formik';
import { LOGININITIALVALUES, PATHS } from '@/contants';
import { otpSchema } from '@/utils/validationSchema';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';

type IProps = {
	submitHandler: (otp: string) => Promise<boolean>;
	isLoading: boolean;
	fromGazaMap?: boolean;
};

const Form = ({ submitHandler, isLoading, fromGazaMap }: IProps) => {
	const { url, replace } = useLocaleRouter();

	const onSubmit = async (values: { otp: string }) => {
		const success = await submitHandler(values.otp);
		if (!success) return;
		const href = fromGazaMap ? PATHS.DASHBOARD : PATHS.LOGIN;
		replace(href);
	};

	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: {
			otp: '',
		}, // Corrected constant name
		validationSchema: otpSchema,
		onSubmit,
	});

	const t = useTranslations('VerifyOtp.form');

	const getResendOtpURL = () => {
		const queryParams: Record<string, string> = {};
		if (fromGazaMap) {
			queryParams['from'] = 'gaza_map';
		}

		let resendOtpLink = PATHS.RESEND_OTP;
		if (Object.keys(queryParams).length > 0) {
			let hashedQuery = Object.keys(queryParams)
				.map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
				.join('&');
			resendOtpLink += `?${hashedQuery}`;
		}
		return resendOtpLink
	}

	
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
					</div>
					<Input
						title={t('otp.title')}
						placeholder="1234567"
						name="otp"
						type="text" // Added type attribute
						onChange={handleChange}
						value={values.otp}
						error={touched.otp && errors.otp}
						className="max-w-[800px]"
					/>
					<div className="flex justify-end w-full my-2">
						<Link
							href={url(getResendOtpURL())}
							replace={true}
							className="text-primary text-right text-[12px] font-bold"
						>
							{t('resendOtp')}
						</Link>
					</div>

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
		</>
	);
};

export default Form;
