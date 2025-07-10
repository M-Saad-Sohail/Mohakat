'use client';
import React, { useState, useRef } from 'react';
import Input from '@/components/ui/Input';
// import Button from '@/components/ui/Button';
import Button from '@/components/ui/LandingPage/Button';
import Link from 'next/link';
import { useFormik } from 'formik';
import { LOGININITIALVALUES, PATHS } from '@/contants';
import { otpSchema } from '@/utils/validationSchema';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import Heading from '@/components/ui/Heading/Heading';

type IProps = {
	submitHandler: (otp: any) => Promise<boolean>;
	isLoading: boolean;
	fromGazaMap?: boolean;
};

const Form = ({ submitHandler, isLoading, fromGazaMap }: IProps) => {
	const { url, replace } = useLocaleRouter();
	let numberOfDigits = 6;
	const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(''));
	const otpBoxReference = useRef<any[]>([]);

	const onSubmit = async (values: { otp: any }) => {
		const success = await submitHandler(otp.toString().replace(/,/g, ''));
		if (!success) return;
		const href = fromGazaMap ? PATHS.DASHBOARD : PATHS.LOGIN;
		replace(href);
	};

	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: {
			otp: '',
		}, // Corrected constant name
		// validationSchema: otpSchema,
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
		return resendOtpLink;
	};

	const handleOtpChange = (value: string, index: number) => {
		const newArr = [...otp];
		newArr[index] = value;
		setOtp(newArr);

		if (value && index < numberOfDigits - 1) {
			otpBoxReference.current[index + 1]?.focus();
		}
	};

	const handleBackspaceAndEnter = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
			otpBoxReference.current[index - 1]?.focus();
		}
		if (
			e.key === 'Enter' &&
			e.currentTarget.value &&
			index < numberOfDigits - 1
		) {
			otpBoxReference.current[index + 1]?.focus();
		}
	};

	return (
		<>
			<form className="my-[80px]" noValidate onSubmit={handleSubmit}>
				<div className="mx-4 flex flex-col justify-center items-center space-y-5">
					<div>
					<div className = "flex flex-col justify-center items-center">
							<Heading heading = {t('title')} className = "main_heading-black" />
						</div>
					</div>
					<div className="flex flex-col  items-center gap-4">
						<div className="flex items-center gap-4">
							{otp.map((digit, index) => (
								<input
									key={index}
									value={digit}
									maxLength={1}
									onChange={(e) => handleOtpChange(e.target.value, index)}
									onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
									ref={(reference) =>
										(otpBoxReference.current[index] = reference)
									}
									className={`border-2 text-center w-10 md:w-14 h-auto text-[#CF7475] p-3 text-sm font-semibold rounded-md block bg-[#E8E8E8] focus:outline-none appearance-none ${
										digit ? 'border-filled' : 'border-empty'
									}`}
								/>
							))}
						</div>
						<div className="flex justify-end items-end w-full my-2">
							<Link
								href={url(getResendOtpURL())}
								replace={true}
								className="text-primary text-right text-[12px] font-bold"
							>
								{t('resendOtp')}
							</Link>
						</div>
					</div>

					<div className="flex items-center justify-center w-full">
						{/* <Button
							title={t('submit')}
							className="max-w-[200px] text-base px-6"
							type="submit"
							isLoading={isLoading}
						/> */}
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
		</>
	);
};

export default Form;
