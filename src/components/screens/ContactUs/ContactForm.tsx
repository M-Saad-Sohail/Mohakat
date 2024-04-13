'use client';
import React from 'react';
import { useFormik } from 'formik';
import Input from '@/components/ui//Input';
import Button from '@/components/ui/LandingPage/Button';

const ContactForm = () => {
	const ContactForm = useFormik({
		initialValues: {
			name: '',
			email: '',
			message: '',
		},
		onSubmit: async (values: any) => {
			console.log(values);
		},
	});

	return (
		<form className=" flex flex-col">
			<Input
				title={'Name'}
				name="name"
				placeholder="name"
				className="mb-[10px] min-w-[250px] text-[#000000]"
				value={ContactForm.values?.name}
				onChange={ContactForm.handleChange}
			/>
			<Input
				title={'Email'}
				name="email"
				placeholder="example@example.com"
				className="mb-[10px] min-w-[250px] text-[#000000]"
				value={ContactForm.values?.name}
				onChange={ContactForm.handleChange}
			/>
			<div className=" flex flex-col gap-4">
				<label className="text-[16px] font-bold font-sans text-primary">
					Message
				</label>
				<textarea
					title={'Message'}
					name="message"
					cols={50}
					rows={5}
					placeholder="Enter your message..."
					className="py-3 px-5 w-full focus:outline-none bg-[#E8E8E8] h-[50px] text-[15px] max-w-[700px] mb-[19px] min-w-[250px] text-[#000000]"
					value={ContactForm.values?.message}
					onChange={ContactForm.handleChange}
				/>
			</div>
			<div className=" flex justify-end">
				<Button title={'Send'} className=" bg-[#000000]" />
			</div>
		</form>
	);
};

export default ContactForm;
