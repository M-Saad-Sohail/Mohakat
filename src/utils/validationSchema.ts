import { object, string, ref, number } from 'yup';
export const loginSchema = object({
	email: string().required('Username is Required'),
	password: string().required('Password is Required'),
});

export const becomeSponsorSchema = object({
	name: string().required('Name is Required'),
	country: string().required('Country is Required'),
	email: string().required('Email is Required'),
	password: string().required('Password is required'),
	language: string().required('Language is Required'),
	confirmPassword: string()
		.required('Confirm Password is Required')
		.oneOf([ref('password')], 'Passwords must match'),
});

export const resetPasswordSchema = object({
	password: string().required('Password is required'),
	new_password1: string().required('Password is required'),
	new_password2: string()
		.oneOf([ref('new_password1')], 'Passwords must match')
		.required('Confirm password is required'),
});

export const updateProfileSchema = object({
	name: string().required('Name is Required'),
	email: string().required('Email is Required'),
	country: string().required('Country is Required'),
	language: string().required('Language is Required'),
});