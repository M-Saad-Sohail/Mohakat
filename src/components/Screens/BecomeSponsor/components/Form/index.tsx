import React from 'react';
import Input from './../../../../UI//Input';
import Button from './../../../../UI/Button';
import Select from './../../../../UI/Select';
import Link from 'next/link';
import { useFormik } from 'formik';
import { PATHS, BECOMESPONSORINITIALVALUES } from '../../../../../contants';
import { becomeSponsorSchema } from './../../../../../utils/validationSchema';
import {
	BecomeSponsorSchema,
	RegisterUserCredentials,
} from '../../../../../types';
import { useIntl } from 'react-intl';

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
			console.log('values', values);
			const { confirmPassword, ...rest } = values;
			submitHandler({ ...rest, email: values.email.toLowerCase() });
		},
	});

	const int = useIntl();
	const getLocaleValue = (id: string) =>
		int.formatMessage({ id: `becomesponsor.form.${id}` });

	return (
		<>
			<form
				className="w-full my-[200px] max-w-[800px]" // Set form overflow to auto
				noValidate
				onSubmit={handleSubmit}
			>
				<div className="mx-4">
					<h2 className="text-4xl font-extrabold text-primary mt-10 leading-normal pt-2">
						{getLocaleValue('title')}
					</h2>
					<p className="text-xl font-semibold text-primary  leading-normal pt-2 mb-8">
						{getLocaleValue('description')}
					</p>
					<div className="w-full flex flex-col gap-4">
						<Input
							title={getLocaleValue('name.title')}
							placeholder={getLocaleValue('name.placeholder')}
							name="name"
							className="max-w-[800px] w-full"
							onChange={handleChange}
							value={values.name}
							error={touched.name && errors.name}
						/>
						<div className="flex flex-row max-w-[800px] w-full gap-3">
							<Input
								title={getLocaleValue('email.title')}
								placeholder={getLocaleValue('email.placeholder')}
								type="email"
								className="flex-[1.5]"
								name="email"
								onChange={handleChange}
								value={values.email}
								error={touched.email && errors.email}
							/>
							<Select
								name="language"
								title="Language"
								className="flex-[1.1]"
								options={[
									{ label: 'EN (United Kingdom)', value: 'en' },
									{ label: 'Arabic', value: 'ar' },
									{ label: 'Turkish', value: 'tr' },
								]}
								onChange={handleChange}
								value={values.language}
								error={touched.language && errors.language}
							/>
						</div>
						<Input
							title={getLocaleValue('password.title')}
							placeholder="*************"
							name="password"
							type="password"
							className="max-w-[800px] text-primary"
							onChange={handleChange}
							value={values.password}
							error={touched.password && errors.password}
						/>
						<Input
							title={getLocaleValue('confirmPassword.title')}
							placeholder="*************"
							name="confirmPassword"
							type="password"
							className="max-w-[800px] text-primary"
							onChange={handleChange}
							value={values.confirmPassword}
							error={touched.confirmPassword && errors.confirmPassword}
						/>

						<Input
							title={getLocaleValue('country.title')}
							placeholder={getLocaleValue('country.placeholder')}
							name="country"
							className="max-w-[800px] w-full"
							onChange={handleChange}
							value={values.country}
							error={touched.country && errors.country}
						/>

						<div className=" justify-center items-center flex w-full">
							<Button
								title={getLocaleValue('submit')}
								className="max-w-[250px] px-6 "
								type="submit"
								isLoading={isLoading}
							/>
						</div>
					</div>
				</div>
			</form>
			<div className="text-center text-primary text-lg my-6 absolute bottom-12 max-w-[800px] w-full justify-center items-center flex font-helvetica gap-x-2">
				{' '}
				{getLocaleValue('cta.0')}{' '}
				<Link className="text-primary font-bold" href={'/sign-in'}>
					{getLocaleValue('cta.1')}
				</Link>
			</div>
		</>
	);
};

export default Form;
