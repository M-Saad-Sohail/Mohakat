'use client';
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/LandingPage/Button';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input';
import { postJson, putJson } from '@/api/api.instances';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { useParams } from 'next/navigation';

const ResetPassword = () => {
	const { user } = useLoggedInUser();
	const t = useTranslations('resetPassword.form');
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>({
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData((prev: any) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await putJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/reset/password/${params && params.token}`,
				{
					password: data.password,
					confirmPassword: data.confirmPassword,
				},
			);
			if (res.success) {
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form
			className="w-full my-[100px] max-w-[800px]"
			noValidate
			onSubmit={handleSubmit}
		>
			<div className="mx-4 space-y-5">
				<div>
					<div className="pt-2 text-4xl font-extrabold leading-normal text-primary">
						{t('title')}
					</div>
					<div className="pt-2 mb-8 text-xl font-semibold leading-normal text-primary">
						{t('description')}
					</div>
				</div>
				<Input
					title={t('password.title')}
					placeholder={t('password.placeholder')}
					type="password"
					name="password"
					onChange={handleChange}
					value={data.password}
					className="mb-[19px] max-w-[800px]"
				/>

				<Input
					title={t('newPassword.title')}
					placeholder={t('newPassword.placeholder')}
					type="password"
					name="confirmPassword"
					onChange={handleChange}
					value={data.confirmPassword}
					className="mb-[19px] max-w-[800px]"
				/>

				<div className="flex items-center justify-center w-full">
					<Button
						title={t('submit')}
						type="submit"
						isLoading={loading}
						className=" bg-[#CF7475] w-56"
					/>
				</div>
			</div>
		</form>
	);
};

export default ResetPassword;
