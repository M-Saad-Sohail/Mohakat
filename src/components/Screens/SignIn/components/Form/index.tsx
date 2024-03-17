'use client';
import React from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Link from 'next/link';
import { useFormik } from 'formik';
import { PATHS, LOGININITIALVALUES } from '@/contants';
import { loginSchema } from '@/utils/validationSchema';
import { UserCredentials } from '@/types';
import { FormattedMessage, useIntl } from 'react-intl';

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

	const int = useIntl();

	return (
		<form className="w-full mt-[200px]" noValidate onSubmit={handleSubmit}>
			<div className="mx-4 my-10 space-y-5">
				<div>
					<div className="text-4xl font-extrabold text-primary mt-10 leading-normal pt-2">
						<FormattedMessage id="signin.form.title" />
					</div>
					<div className="text-xl font-semibold text-primary leading-normal pt-2 mb-8">
						<FormattedMessage id="signin.form.description" />
					</div>
				</div>
				<Input
					title={int.formatMessage({ id: 'signin.form.email.title' })}
					placeholder={int.formatMessage({
						id: 'signin.form.email.placeholder',
					})}
					type="email"
					name="email"
					onChange={handleChange}
					value={values.email}
					error={touched.email && errors.email}
				/>
				<Input
					title={int.formatMessage({ id: 'signin.form.password.title' })}
					placeholder="*************"
					name="password"
					type="password" // Added type attribute
					onChange={handleChange}
					className="w-[98%]"
					value={values.password}
					error={touched.password && errors.password}
				/>
				<div className="justify-center items-center flex w-full">
					<Button
						title={int.formatMessage({ id: 'signin.form.submit' })}
						className="min-w-[250px] text-base px-6"
						type="submit"
						isLoading={isLoading}
					/>
				</div>
				<div className="text-center text-primary text-lg my-6 justify-center items-center flex font-helvetica mt-20 gap-x-4">
					<FormattedMessage id="signin.form.cta.0" />
					<Link className="text-primary font-bold" href="/become-sponsor">
						<FormattedMessage id="signin.form.cta.1" />
					</Link>
				</div>
			</div>
		</form>
	);
};

export default Form;
