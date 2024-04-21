'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import Input from '@/components/ui//Input';
import Button from '@/components/ui/LandingPage/Button';
import { postJson } from '@/api/api.instances';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { contactFormSchema } from '@/utils/validationSchema';

const ContactForm = () => {
	const { user } = useLoggedInUser();
	const [loading, setLoading] = useState(false);
	const t = useTranslations('ContactUs');
	const ContactForm = useFormik({
		initialValues: {
			name: '',
			email: '',
			message: '',
		},
		validationSchema: contactFormSchema,
		onSubmit: async (values: any) => {
			const response = {
				name: values.name,
				email: values.email,
				message: values.message,
			};
			try {
				setLoading(true);
				const res = await postJson(
					`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/contact-form-submit`,
					response,
					user?.key,
				);
				if (res.success) {
					setLoading(false);
					ContactForm.resetForm();
					toast.success(`${t('success')}`, {
						toastId: 'success',
						position: 'bottom-right',
						autoClose: 4000,
					});
				}
			} catch (error) {
				console.log(error);
				toast.error(`${t('error')}`, {
					toastId: 'error',
					position: 'bottom-right',
					autoClose: 4000,
				});
			}
		},
	});

	return (
		<form onSubmit={ContactForm.handleSubmit} className=" flex flex-col">
			<Input
				title={t('name')}
				name="name"
				placeholder="name"
				className="mb-[5px] min-w-[250px] text-[#000000]"
				value={ContactForm.values?.name}
				onChange={ContactForm.handleChange}
			/>
			{ContactForm.touched.name && Boolean(ContactForm.errors.name) ? (
				<span style={{ color: 'red' }}>{ContactForm.errors.name as any}</span>
			) : null}
			<Input
				title={t('email')}
				name="email"
				placeholder="example@example.com"
				className="mb-[5px] min-w-[250px] text-[#000000] mt-2"
				value={ContactForm.values?.email}
				onChange={ContactForm.handleChange}
			/>
			{ContactForm.touched.email && Boolean(ContactForm.errors.email) ? (
				<span style={{ color: 'red' }}>{ContactForm.errors.email as any}</span>
			) : null}
			<div className=" flex flex-col gap-4">
				<label className="text-[16px] font-bold font-sans text-primary mt-3">
					{t('message')}
				</label>
				<textarea
					title={'Message'}
					name="message"
					cols={50}
					rows={5}
					placeholder="Enter your message..."
					className="py-3 px-5 w-full focus:outline-none bg-[#E8E8E8] h-[50px] text-[15px] max-w-[700px] mb-[5px] min-w-[250px] text-[#000000]"
					value={ContactForm.values?.message}
					onChange={ContactForm.handleChange}
				/>
			</div>
			{ContactForm.touched.message && Boolean(ContactForm.errors.message) ? (
				<span style={{ color: 'red' }}>
					{ContactForm.errors.message as any}
				</span>
			) : null}
			<div className=" flex justify-end mt-4">
				<Button
					title={t('send')}
					isLoading={loading}
					type="submit"
					Color="#000000"
				/>
			</div>
		</form>
	);
};

export default ContactForm;
