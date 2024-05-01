'use client';
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/LandingPage/Button';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input';
import { postJson } from '@/api/api.instances';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
	const t = useTranslations('forgotPassword.form');
	const [loading, setLoading] = useState<boolean>(false);
	const params = useParams();
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string>('');
	const { user } = useLoggedInUser();

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
	}

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const result = regex.test(email);
		try {
			if (email === '') {
				setError('Email is required');
				return;
			}
			if (!result) {
				setError('Please enter a valid email');
			} else {
				setError('');
				setLoading(true);
				const res = await postJson(
					`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/forgot/password`,
					{
						email: email,
						urlSlug: params && params.locale,
					},
					user?.key,
				);
				if (res.success) {
					setLoading(false);
					toast.success(`${t('emailCheck')}`, {
						position: 'top-right',
						autoClose: 4000,
					});
					setEmail('');
				}
			}
		} catch (error: any) {
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				setLoading(false);
				toast.error(error.response.data.message, {
					position: 'top-right',
					autoClose: 4000,
				});
			} else {
				console.log(error);
			}
		}
	};

	return (
		<form className="w-full my-[100px] max-w-[800px] animated-div" noValidate>
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
					title={t('email.title')}
					placeholder={t('email.placeholder')}
					type="email"
					name="email"
					onChange={handleChange}
					value={email}
					error={error}
					className="mb-[19px] max-w-[800px]"
				/>

				<div className="flex items-center justify-center w-full">
					<Button
						title={t('submit')}
						type="submit"
						isLoading={loading}
						className="w-56"
						Color="#CF7475"
						onClick={handleSubmit}
					/>
				</div>
			</div>
		</form>
	);
};

export default ForgotPassword;
