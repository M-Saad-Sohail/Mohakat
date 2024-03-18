import React from 'react';
import Input from '@/components/UI//Input';
import Button from '@/components/UI/Button';
import Select from '@/components/UI/Select';
import Link from 'next/link';
import { useFormik } from 'formik';
import { BECOMESPONSORINITIALVALUES } from '@/contants';
import { becomeSponsorSchema } from '@/utils/validationSchema';
import { RegisterUserCredentials } from '@/types';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useTranslations } from 'next-intl';

type IProps = {
	submitHandler: (
		arg: Omit<RegisterUserCredentials, 'confirmPassword'>,
	) => void;
	isLoading: boolean;
};

const Form = ({ submitHandler, isLoading }: IProps) => {
	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: BECOMESPONSORINITIALVALUES,
		validationSchema: becomeSponsorSchema,
		onSubmit: (values: RegisterUserCredentials) => {
			const { confirmPassword, ...rest } = values;
			submitHandler({ ...rest, email: values.email.toLowerCase() });
		},
	});

	const t = useTranslations('BecomeSponsor.form');
	const { url } = useLocaleRouter();

	return (
		<>
			<form
				className="w-full my-[200px] max-w-[800px]" // Set form overflow to auto
				noValidate
				onSubmit={handleSubmit}
			>
				<div className="mx-4">
					<h2 className="text-4xl font-extrabold text-primary mt-10 leading-normal pt-2">
						{t('title')}
					</h2>
					<p className="text-xl font-semibold text-primary  leading-normal pt-2 mb-8">
						{t('description')}
					</p>
					<div className="w-full flex flex-col gap-4">
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
								className="flex-[1.5]"
								name="email"
								onChange={handleChange}
								value={values.email}
								error={touched.email && errors.email}
							/>
							<Select
								name="language"
								title={t('language.title')}
								className="flex-[1.1]"
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

						<Input
							title={t('country.title')}
							placeholder={t('country.placeholder')}
							name="country"
							className="max-w-[800px] w-full"
							onChange={handleChange}
							value={values.country}
							error={touched.country && errors.country}
						/> 

						<div className="justify-center items-center flex w-full">
							<Button
								title={t('submit')}
								className="max-w-[250px] px-6 "
								type="submit"
								isLoading={isLoading}
							/>
						</div>
					</div>
				</div>
			</form>
			<div className="text-center text-primary text-lg my-6 absolute bottom-12 max-w-[800px] w-full justify-center items-center flex font-helvetica gap-x-2">
				{t('cta.0')}
				<Link className="text-primary font-bold" href={url('/sign-in')}>
					{t('cta.1')}
				</Link>
			</div>
		</>
	);
};

export default Form;
