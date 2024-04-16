import { object, array, string, ref, number } from 'yup';
export const loginSchema = object({
	email: string().required('Username is Required'),
	password: string().required('Password is Required'),
});

export const otpSchema = object({
	otp: string().required('Otp is required'),
});

export const resendOtpSchema = object({
	email: string().required('Email is required'),
});

export const becomeSponsorSchema = object({
	name: string().required('Name is Required')
	.matches(/^[A-Za-z]+$/, 'Name should only contain alphabets'),
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

// export const AddFamiliesSchema = object({
// 	numberOfFamilyMembers: number()
//     .min(0, 'Number of family members must be positive or zero')
//     .required('Number of family members is required'),
// });

export const AddFamiliesSchema = object({
	breadWinnerName: string().required('Breadwinner name is required'),
	breadWinnerNameEn: string().required(
		'Breadwinner name (English) is required',
	),
	breadWinnerNameTr: string().required(
		'Breadwinner name (Turkish) is required',
	),
	breadWinnerNameAr: string().required('Breadwinner name (Arabic) is required'),
	description: string().required('Description is required'),
	descriptionEn: string().required('Description (English) is required'),
	descriptionTr: string().required('Description (Turkish) is required'),
	descriptionAr: string().required('Description (Arabic) is required'),
	maritalStatus: string().required('Marital status is required'),
	email: string()
		.email('Invalid email address')
		.required('Email address is required'),
	gender: string().required('Gender is required'),
	age: number()
		.positive('Age must be a positive number')
		.integer('Age must be an integer')
		.required('Age is required'),
	dateOfBirth: string().required('Date of birth is required'),
	language: string().required('Language is required'),
	areaOfPreviousResidence: string().required(
		'Previous residence area is required',
	),
	areaOfCurrentResidence: string().required(
		'Current residence area is required',
	),
	numberOfFamilyMembers: number()
		.min(0, 'Number of family members must be positive or zero')
		.required('Number of family members is required'),
	lossesInWar: number()
		.min(0, 'Losses in war must be positive or zero')
		.required('Losses in war is required'),
	numberOfMartyrInFamily: number()
		.min(0, 'Number of martyrs in family must be positive or zero')
		.required('Number of martyrs in family is required'),
	numberOfInfectedInFamily: number()
		.min(0, 'Number of infected in family must be positive or zero')
		.required('Number of infected in family is required'),
	telephoneNumber: string().required('Telephone number is required'),
	idNumber: string().required('ID number is required'),
	currentSituation: string().required('Current situation is required'),
	familyMemberDetail: array().required('Family member detail is required'),
});

export const updateProfileSchema = object({
	name: string().required('Name is Required'),
	email: string().required('Email is Required'),
	country: string().required('Country is Required'),
	language: string().required('Language is Required'),
});

export const contactFormSchema = object({
	name: string().required('Name is Required'),
	email: string().required('Email is Required'),
	message: string().required('Message is Required'),
});
