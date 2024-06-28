import { object, array, string, ref, number, ObjectSchema  } from 'yup';
import { useTranslations } from 'next-intl';
import {
	BecomeSponsorSchemaType
} from '../types';

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

// export const becomeSponsorSchema = object({
// 	name: string()
// 		.required('Name is Required')
// 		.matches(
// 			/^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
// 			'Name should only contain alphabets and spaces between words',
// 		)
// 		.notOneOf([' '], 'Name cannot be just spaces'),
// 	country: string().required('Country is Required'),
// 	email: string().required('Email is Required'),
// 	password: string().required('Password is required'),
// 	language: string().required('Language is Required'),
// 	confirmPassword: string()
// 		.required('Confirm Password is Required')
// 		.oneOf([ref('password')], 'Passwords must match'),
// });

// export const becomeSponsorSchema =  (t: (key: string) => string) => {

// 	return object({
// 		name: string()
// 		.required(t("name"))
// 		.matches(
// 			/^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
// 			t("nameMatch"),
// 		)
// 		.notOneOf([' '], t("nameNotSpace")),
// 	country: string().required(t("country")),
// 	email: string().required(t("email")),
// 	password: string().required(t("password")),
// 	language: string().required(t("language")),
// 	confirmPassword: string()
// 		.required(t("confirmPassword"))
// 		.oneOf([ref('password')], t("passowordNotMatch")),
// 	})
// }

export const becomeSponsorSchema = (t: any): BecomeSponsorSchemaType => {
	return object({
	  name: string()
		.required(t("name"))
		.matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, t("nameMatch"))
		.notOneOf([' '], t("nameNotSpace")),
	  country: string().required(t("country")),
	  email: string().email(t("invalidEmail")).required(t("email")),
	  password: string().required(t("password")),
	  language: string().required(t("language")),
	  confirmPassword: string()
		.required(t("confirmPassword"))
		.oneOf([ref('password')], t("passwordNotMatch")),
	});
  };


// export const becomeSponsorSchema = (t: any): ObjectSchema<any> => {
// 	return object({
// 	  name: string()
// 		.required(t("name"))
// 		.matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, t("nameMatch"))
// 		.notOneOf([' '], t("nameNotSpace")),
// 	  country: string().required(t("country")),
// 	  email: string().required(t("email")),
// 	  password: string().required(t("password")),
// 	  language: string().required(t("language")),
// 	  confirmPassword: string()
// 		.required(t("confirmPassword"))
// 		.oneOf([ref('password')], t("passwordNotMatch")),
// 	});
//   };

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

// export const AddFamiliesSchema = object({
// 	const t = useTranslations('FamilyValidationSchema');

// 	// breadWinnerName: string().required('Breadwinner name is required'),
// 	breadWinnerNameEn: string().required(
// 		// 'Breadwinner name (English) is required',
// 		t("breadWinnerNameEn")
// 	),
// 	// breadWinnerNameTr: string().required(
// 	// 	'Breadwinner name (Turkish) is required',
// 	// ),
// 	// breadWinnerNameAr: string().required('Breadwinner name (Arabic) is required'),
// 	// description: string().required('Description is required'),
// 	descriptionEn: string(),
// 	// descriptionTr: string(),
// 	// descriptionAr: string(),
// 	email: string()
// 		.email('Invalid email address')
// 		.required('Email address is required'),
// 	genderEn: string().required(t("genderEn")),
// 	// genderTr: string().required('Gender (Turkish) is required'),
// 	// genderAr: string().required('Gender (Arabic) is required'),
// 	dateOfBirth: string().required('Date of birth is required'),
// 	maritalStatusEn: string().required('Maritial status (English) is required'),
// 	// maritalStatusTr: string().required('Maritial status (Turkish) is required'),
// 	// maritalStatusAr: string().required('Maritial status (Arabic) is required'),
// 	language: string().required('Language is required'),
// 	areaOfPreviousResidenceEn: string().required(
// 		'Previous residence area (in English) is required',
// 	),
// 	// areaOfPreviousResidenceTr: string().required(
// 	// 	'Previous residence area (in Turkish) is required',
// 	// ),
// 	// areaOfPreviousResidenceAr: string().required(
// 	// 	'Previous residence area (in English) is required',
// 	// ),
// 	areaOfCurrentResidenceEn: string().required(
// 		'Current residence area (in English) is required',
// 	),
// 	// areaOfCurrentResidenceTr: string().required(
// 	// 	'Current residence area (in Turkish) is required',
// 	// ),
// 	// areaOfCurrentResidenceAr: string().required(
// 	// 	'Current residence area (in English) is required',
// 	// ),
// 	currentSituationEn: string().required(
// 		'Current situation (in English) is required',
// 	),
// 	// currentSituationTr: string().required(
// 	// 	'Current situation  (in Turkish) is required',
// 	// ),
// 	// currentSituationAr: string().required(
// 	// 	'Current situation  (in Arabic) is required',
// 	// ),
// 	lossesInWarEn: string().required('Losses In War (in English) is required'),
// 	// lossesInWarTr: string().required('Losses In War  (in Turkish) is required'),
// 	// lossesInWarAr: string().required('Losses In War  (in Arabic) is required'),
// 	numberOfFamilyMembers: number()
// 		.min(0, 'Number of family members must be positive or zero')
// 		.required('Number of family members is required'),
// 	numberOfMartyrInFamily: number()
// 		.min(0, 'Number of martyrs in family must be positive or zero')
// 		.required('Number of martyrs in family is required'),
// 	numberOfInfectedInFamily: number()
// 		.min(0, 'Number of infected in family must be positive or zero')
// 		.required('Number of infected in family is required'),
// 	telephoneNumber: number().required('Telephone number is required'),
// 	idNumber: number().required('ID number is required'),

// 	familyMemberDetail: array().required('Family member detail is required'),
// });

export const AddFamiliesSchema =  (t: (key: string) => string) => {
	return object({
	  breadWinnerNameEn: string().required(t('breadWinnerNameEn')),
	  descriptionEn: string(),
	  email: string()
		.email(t("invalidEmail"))
		.required(t("email")),
	  genderEn: string().required(t('genderEn')),
	  dateOfBirth: string().required(t('dateOfBirth')),
	  maritalStatusEn: string().required(t('maritalStatusEn')),
	  language: string().required(t('language')),
	  areaOfPreviousResidenceEn: string().required(
		t('areaOfPreviousResidenceEn')
	  ),
	  areaOfCurrentResidenceEn: string().required(
		t('areaOfCurrentResidenceEn')
	  ),
	  currentSituationEn: string().required(
		t('currentSituationEn')
	  ),
	  lossesInWarEn: string().required(t('lossesInWarEn')),
	  numberOfFamilyMembers: number()
		.min(0, 'Number of family members must be positive or zero')
		.required(t('numberOfFamilyMembers')),
	  numberOfMartyrInFamily: number()
		.min(0, 'Number of martyrs in family must be positive or zero')
		.required(t('numberOfMartyrInFamily')),
	  numberOfInfectedInFamily: number()
		.min(0, 'Number of infected in family must be positive or zero')
		.required(t('numberOfInfectedInFamily')),
	  password: string()
		.min(8, t("minPassword"))
		.required(t('password')),
	  telephoneNumber: number().required(t('telephoneNumber')),
	  idNumber: number().required(t('idNumber')),
	  familyMemberDetail: array().required('Family member detail is required')
	});
  };

export const UpdateFamilySchema = object({
	// breadWinnerName: string().required('Breadwinner name is required'),
	breadWinnerNameEn: string().required(
		'Breadwinner name (English) is required',
	),
	breadWinnerNameTr: string().required(
		'Breadwinner name (Turkish) is required',
	),
	breadWinnerNameAr: string().required('Breadwinner name (Arabic) is required'),
	// description: string().required('Description is required'),
	descriptionEn: string(),
	descriptionTr: string(),
	descriptionAr: string(),
	email: string()
		.email('Invalid email address')
		.required('Email address is required'),
	genderEn: string().required('Gender (English) is required'),
	genderTr: string().required('Gender (Turkish) is required'),
	genderAr: string().required('Gender (Arabic) is required'),
	dateOfBirth: string().required('Date of birth is required'),
	maritalStatusEn: string().required('Maritial status (English) is required'),
	maritalStatusTr: string().required('Maritial status (Turkish) is required'),
	maritalStatusAr: string().required('Maritial status (Arabic) is required'),
	language: string().required('Language is required'),
	areaOfPreviousResidenceEn: string().required(
		'Previous residence area (in English) is required',
	),
	areaOfPreviousResidenceTr: string().required(
		'Previous residence area (in Turkish) is required',
	),
	areaOfPreviousResidenceAr: string().required(
		'Previous residence area (in English) is required',
	),
	areaOfCurrentResidenceEn: string().required(
		'Current residence area (in English) is required',
	),
	areaOfCurrentResidenceTr: string().required(
		'Current residence area (in Turkish) is required',
	),
	areaOfCurrentResidenceAr: string().required(
		'Current residence area (in English) is required',
	),
	currentSituationEn: string().required(
		'Current situation (in English) is required',
	),
	currentSituationTr: string().required(
		'Current situation  (in Turkish) is required',
	),
	currentSituationAr: string().required(
		'Current situation  (in Arabic) is required',
	),
	lossesInWarEn: string().required('Losses In War (in English) is required'),
	lossesInWarTr: string().required('Losses In War  (in Turkish) is required'),
	lossesInWarAr: string().required('Losses In War  (in Arabic) is required'),
	numberOfFamilyMembers: number()
		.min(0, 'Number of family members must be positive or zero')
		.required('Number of family members is required'),
	numberOfMartyrInFamily: number()
		.min(0, 'Number of martyrs in family must be positive or zero')
		.required('Number of martyrs in family is required'),
	numberOfInfectedInFamily: number()
		.min(0, 'Number of infected in family must be positive or zero')
		.required('Number of infected in family is required'),
	telephoneNumber: number().required('Telephone number is required'),
	idNumber: number().required('ID number is required'),

	familyMemberDetail: array().required('Family member detail is required'),
});

export const updateProfileSchema = object({
	name: string().required('Name is Required'),
	email: string().required('Email is Required'),
	country: string().required('Country is Required'),
	language: string().required('Language is Required'),
});

// export const checkOutSchemaNonLogin = object({
// 	cardHolderName: string().required('Card holder name is required'),
// 	cardNumber: string()
// 		.required('Card number is required')
// 		.test(
// 			'no-spaces',
// 			'Card number must not contain spaces',
// 			(value: any) => !/\s/.test(value),
// 		),
// 	expireMonth: string().required('Expiration month is required'),
// 	expireYear: number()
// 		.required('Expiration year is required')
// 		.min(new Date().getFullYear(), 'Expiration year must be in the future')
// 		.max(9999, 'Invalid expiration year')
// 		.test(
// 			'len',
// 			'Expiration year must be 4 digits',
// 			(val) => val.toString().length === 4,
// 		),
// 	cvc: number()
// 		.required('CVC is required')
// 		.typeError('CVC must be a number')
// 		.min(100, 'CVC must be 3 digits')
// 		.max(999, 'CVC must be 3 digits'),
// });

// export const checkOutSchemaLogin = object({
// 	name: string().required('Name is Required'),
// 	email: string()
// 		.email('Invalid email address')
// 		.required('Email address is required'),
// 	country: string().required('Country is Required'),
// 	city: string().required('City is Required'),
// 	address: string().required('Address is Required'),
// 	cardHolderName: string().required('Card holder name is required'),
// 	cardNumber: string()
// 		.required('Card number is required')
// 		.test(
// 			'no-spaces',
// 			'Card number must not contain spaces',
// 			(value: any) => !/\s/.test(value),
// 		),
// 	expireMonth: string().required('Expiration month is required'),
// 	mobilePhoneNumber: number().required('Mobile number is required'),
// 	nationalIdentityNumber: number()
// 		.required('Identity number is required')
// 		.min(14522, 'identity number should be at least 5 digits'),
// 	expireYear: number()
// 		.required('Expiration year is required')
// 		.min(new Date().getFullYear(), 'Expiration year must be in the future')
// 		.max(9999, 'Invalid expiration year')
// 		.test(
// 			'len',
// 			'Expiration year must be 4 digits',
// 			(val) => val.toString().length === 4,
// 		),

// 	cvc: number()
// 		.required('CVC is required')
// 		.typeError('CVC must be a number')
// 		.min(100, 'CVC must be 3 digits')
// 		.max(999, 'CVC must be 3 digits'),
// });

// export const contactFormSchema = object({
// 	name: string().required('Name is Required'),
// 	email: string().required('Email is Required'),
// 	message: string().required('Message is Required'),
// });

export const contactFormSchema =  (t: (key: string) => string) => {
	return object({
		name: string().required(t("name")),
		email: string().required(t("email")),
		message: string().required(t("message")),
	})

}

export const checkOutSchemaNonLogin =  (t: (key: string) => string) => {
	return object({
		cardHolderName: string().required(t("cardHolderName")),
		cardNumber: string()
			.required(t("cardNumber"))
			.test(
				'no-spaces',
				t("cardNumberNoSpace"),
				(value: any) => !/\s/.test(value),
			),
		expireMonth: string().required(t("expireMonth")),
		expireYear: number()
			.required(t("expireYear"))
			.min(new Date().getFullYear(), t("expireYearMin"))
			.max(9999, t("expireYearMax"))
			.test(
				'len',
				t("expireDigitLimit"),
				(val) => val.toString().length === 4,
			),
		cvc: number()
			.required(t("cvc"))
			.typeError(t("cvcTypeError"))
			.min(100, t("cvcMin"))
			.max(999, t("cvcMax")),
	});

}

export const checkOutSchemaLogin =  (t: (key: string) => string) => {
	return  object({
		name: string().required(t("name")),
		email: string()
			.email(t("invalidEmail"))
			.required(t("email")),
		country: string().required(t("country")),
		city: string().required(t("city")),
		address: string().required(t("address")),
		cardHolderName: string().required(t("cardHolderName")),
		cardNumber: string()
			.required(t("cardNumber"))
			.test(
				'no-spaces',
				t("cardNumberNoSpace"),
				(value: any) => !/\s/.test(value),
			),
		expireMonth: string().required(t("expireMonth")),
		mobilePhoneNumber: number().required(t("mobilePhoneNumber")),
		nationalIdentityNumber: number()
			.required(t("nationalIdentityNumber"))
			.min(14522, t("nationalIdentityNumberMin")),
		expireYear: number()
			.required(t("expireYear"))
			.min(new Date().getFullYear(), t("expireYearMin"))
			.max(9999, t("expireYearMax"))
			.test(
				'len',
				t("expireDigitLimit"),
				(val) => val.toString().length === 4,
			),
	
		cvc: number()
			.required(t("cvc"))
			.typeError(t("cvcTypeError"))
			.min(100, t("cvcMin"))
			.max(999, t("cvcMax")),
	});
}
