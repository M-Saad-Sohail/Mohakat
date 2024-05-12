import React from 'react';
import Input from '@/components/ui//Input';
// import Button from '@/components/ui/Button';
import Button from '@/components/ui/LandingPage/Button';
import Select from '@/components/ui/Select';
import Link from 'next/link';
import { useFormik } from 'formik';
import { BECOMESPONSORINITIALVALUES, PATHS } from '@/contants';
import { becomeSponsorSchema } from '@/utils/validationSchema';
import { RegisterUserCredentials } from '@/types';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useTranslations } from 'next-intl';
import { countriesData } from '@/contants/countries';
import Heading from '@/components/ui/Heading/Heading';

type IProps = {
	submitHandler: (
		arg: Omit<RegisterUserCredentials, 'confirmPassword'>,
	) => Promise<boolean>;
	isLoading: boolean;
	fromGazaMap: boolean;
};

const Form = ({ submitHandler, isLoading, fromGazaMap }: IProps) => {
	const { url, replace, locale, redirectWithLocale } = useLocaleRouter();

	const onSubmit = async (values: RegisterUserCredentials) => {
		const { confirmPassword, ...rest } = values;
		const success = await submitHandler({
			...rest,
			email: values.email.toLowerCase(),
		});
		if (!success) return;
		let url = PATHS.VERIFY_OTP;
		if (fromGazaMap) url += `?from=${encodeURIComponent('gaza_map')}`;
		redirectWithLocale(locale, url);
		// replace(url);
	};

	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: BECOMESPONSORINITIALVALUES,
		validationSchema: becomeSponsorSchema,
		onSubmit,
	});

	const t = useTranslations('BecomeSponsor.form');

	return (
		<>
			<form
				className="w-full my-[100px] max-w-[800px] animated-div" // Set form overflow to auto
				noValidate
				onSubmit={handleSubmit}
			>
				<div className="mx-4">
				<div className = "flex flex-col justify-center items-center">
							<Heading heading = {t('title')} className = "main_heading-black" />
						</div>
					{/* <h2 className="pt-2  text-4xl font-extrabold leading-normal text-primary">
						{t('title')}
					</h2> */}
					<p className="pt-2 mb-8 text-lg font-semibold leading-normal text-[#36454F] text-center">
						{t('description')}
					</p>
					<div className="flex flex-col w-full gap-4">
						<Input
							title={t('name.title')}
							placeholder={t('name.placeholder')}
							name="name"
							className="max-w-[800px] w-full"
							onChange={handleChange}
							value={values.name}
							error={touched.name && errors.name}
						/>
						<div className="flex flex-row max-w-[800px] w-full gap-3">
							<Input
								title={t('email.title')}
								placeholder={t('email.placeholder')}
								type="email"
								className="w-full"
								name="email"
								onChange={handleChange}
								value={values.email}
								error={touched.email && errors.email}
							/>
							<Select
								name="language"
								title={t('language.title')}
								className="w-[50%] mt-[2px]"
								defaultValue={t('language.default')}
								options={[
									{ label: t('language.english'), value: 'en' },
									{ label: t('language.arabic'), value: 'ar' },
									{ label: t('language.turkish'), value: 'tr' },
								]}
								onChange={handleChange}
								value={values.language}
								error={touched.language && errors.language}
							/>
						</div>
						<Input
							title={t('password.title')}
							placeholder="*************"
							name="password"
							type="password"
							className="max-w-[800px] text-primary"
							onChange={handleChange}
							value={values.password}
							error={touched.password && errors.password}
						/>

						<Input
							title={t('confirmPassword.title')}
							placeholder="*************"
							name="confirmPassword"
							type="password"
							className="max-w-[800px] text-primary"
							onChange={handleChange}
							value={values.confirmPassword}
							error={touched.confirmPassword && errors.confirmPassword}
						/>

						<Select
							title={t('country.title')}
							name="country"
							className="max-w-[800px] w-full mb-8"
							onChange={handleChange}
							value={values.country}
							defaultValue={t('country.default')}
							options={countriesData.map((country) => ({
								label: country.name,
								value: country.code,
							}))}
							error={touched.country && errors.country}
						/>

						<div className="flex items-center justify-center w-full">
							<Button
								title={t('submit')}
								type="submit"
								isLoading={isLoading}
								className="max-w-[300px]"
								Color="#BB9B6C"
							/>
						</div>
					</div>
				</div>
			</form>
			<div className="text-center text-[#36454F] text-base absolute bottom-[3%] max-w-[800px] w-full justify-center items-center flex font-helvetica gap-x-2 ">
				{t('cta.0')}
				<Link
					className="font-bold text-[#BB9B6C] hover:text-[#36454F]"
					href={url('/sign-in')}
				>
					{t('cta.1')}
				</Link>
			</div>
		</>
	);
};

export default Form;
