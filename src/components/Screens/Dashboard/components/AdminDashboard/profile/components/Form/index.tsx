'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/components/UI//Input';
import Button from '@/components/UI/Button';
import Link from 'next/link';
import { useFormik } from 'formik';
import { PATHS, RESETINITIALVALUES } from '@/contants';
import { resetPasswordSchema } from '@/utils/validationSchema';
import { getUserFromLocalStorage } from '@/utils/auth';
import { ResetPasswordSchema, RegisterUserCredentials } from '@/types';
import { useIntl } from 'react-intl';
import { UserType } from '@/state/user/types';
import Image from 'next/image';
import { profile } from '@/assests';
import { ResetPassword } from '@/hooks/useAuth';

type IProps = {
	submitHandler: (arg: ResetPassword,id:String | undefined) => void;
	isLoading: boolean;
};

const SettingForm = ({ submitHandler, isLoading }: IProps) => {
	const [user, setUser] = useState<UserType | null>(null);
	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: RESETINITIALVALUES,
		validationSchema: resetPasswordSchema,
		onSubmit: (values: ResetPasswordSchema) => {
			console.log('values', values);
            submitHandler({
                oldPassword:values.password,
                confirmPassword:values.new_password2,
                newPassword:values.new_password1
            },user?.id);
		},
	});
	useEffect(() => {
		const data = getUserFromLocalStorage();
		setUser(data);
	}, []);
	console.log('user', user);
	return (
		<div className="w-full">
			<form
				className="w-full" // Set form overflow to auto
				noValidate
				onSubmit={handleSubmit}
			>
				<div className="mx-4">
					<h2 className="text-4xl font-bold text-mmain mt-2 leading-normal pt-2">
						Account Management
					</h2>
                    <div className="mt-2">
                    <h2 className="text-2xl font-bold text-mmain my-6 leading-normal pt-2">
                    Profile Information
					</h2>
					<Image
						src={profile} // Replace with the path to the user profile image
						alt={''}
						className="h-[200px] w-[200px] rounded-md mr-2"
					/>
				</div>
                    <div className='flex w-full justify-start gap-x-4 items-center'>
                    <Input
						title={'Name'}
						name="name"
						className="mb-[19px] min-w-[460px]"
						value={user?.name}
                        
                        
					/>
					<Input
						title={'Email'}
						name="email"
						className="mb-[19px] min-w-[460px]"
						value={user?.email}
					/>
                    </div>
				    <div className='flex w-full justify-start gap-x-4 items-center'>
                    <Input
						title={'Country'}
						name="country"
                        className="mb-[19px] min-w-[460px]"
						value={'Pakistan'}
					/>
					<Input title={'Language'} name="language" type="language" value={'En English'}	className="mb-[19px] min-w-[460px]"/>
                    </div>
                    <h4 className="text-2xl font-bold text-mmain my-5 leading-normal pt-2">
						Change Password
					</h4>
					<Input
						title={'Current Password'}
						placeholder="*************"
						name="password"
						type="password"
						value={values.password}
                        onChange={handleChange}
                        error={errors.password && touched.password}
                        className='max-w-[935px] mb-[19px]'
					/>
					<Input
						title={'New Password'}
						placeholder="*************"
						name="new_password1"
						type="password"
						onChange={handleChange}
						value={values.new_password1}
						error={touched.new_password1 && errors.new_password1}
                        className='max-w-[935px] mb-[19px]'
					/>
					<Input
						title={'Confirm Password'}
						placeholder="*************"
						name="new_password2"
						type="password"
						onChange={handleChange}
						value={values.new_password2}
						error={touched.new_password2 && errors.new_password2}
                        className='max-w-[935px] mb-[19px]'
					/>

					<div className=" flex  my-5">
						<Button
							title={('Save Changes')}
							className="max-w-[250px] px-6  shadow-custom"
							type="submit"
							// isLoading={isLoading}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SettingForm;
