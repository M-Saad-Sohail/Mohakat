import {
	LoginSchema,
	ResetPasswordSchema,
} from '../types';

export const PATHS = {
	HOME: '/',
	FAMILY: '/families',
	ABOUT: '/about',
	FQAS: '/faqs',
	CONTACTUS: '/contact',
	FORGETPASSWORD: '/forget-password',
	LOGIN: '/sign-in',
	BECOME_SPONSOR: '/become-sponsor',
	VERIFICATION: '/congratulations',
	VERIFY_OTP: '/verify-otp',
	RESEND_OTP: '/resend-otp',
	DASHBOARD: '/dashboard',
	FAMILIES: '/dashboard/families',
	MANAGEFAMILIES: '/dashboard/manage-family',
	APPROVED_SPONSOR: '/dashboard/sponsor/approved',
	PENDING_SPONSOR: '/dashboard/sponsor/pending',
	REJECTED_SPONSOR: '/dashboard/sponsor/rejected',
	FORM_RESPONSES: '/dashboard/form-responses',
	SETTING: '/dashboard/setting',
	SPONSORING: '/dashboard/sponsoring',
	CREDIT_CARDS: '/dashboard/credit-cards',
	FAMILY_REGISTRATION: '/family-registration',
	LOGIN_FAMILY: '/sign-in-family',
	FORGOT_PASSWORD_FAMILY: '/forgot-password-family',
	FAMILY_VERIFY_OTP: '/family-verify-otp',
	FAMILY_RESET_PASSWORD: '/familyresetpassword',
	FAMILY_RESENT_OTP: "/family-resend-otp",
	FAMILY_SETTINGS: "/dashboard/family-settings",
	FAMILY_SPONSOR: '/dashboard/family-sponsors',
	CHAT_FOR_LOGIN: '/dashboard/chats',
	APPROVED_FAMILY: '/dashboard/family/approved',
	PENDING_FAMILY: '/dashboard/family/pending',
	REJECTED_FAMILY: '/dashboard/family/rejected',
};

export const RESETINITIALVALUES: ResetPasswordSchema = {
	password: '',
	new_password1: '',
	new_password2: '',
};

export const ProfileValues = {
	name: '',
	email: '',
	country: '',
	language: '',
};

export const AddFamiliesValues = {
	breadWinnerName: {},
	breadWinnerNameEn: '',
	breadWinnerNameTr: '',
	breadWinnerNameAr: '',
	description: {},
	maritalStatus: {},
	gender: {},
	areaOfPreviousResidence: {},
	areaOfCurrentResidence: {},
	currentSituation: {},
	lossesInWar: {},
	descriptionEn: '',
	descriptionTr: '',
	descriptionAr: '',
	maritalStatusEn: '',
	maritalStatusTr: '',
	maritalStatusAr: '',
	genderEn: '',
	genderTr: '',
	genderAr: '',
	areaOfPreviousResidenceEn: '',
	areaOfPreviousResidenceTr: '',
	areaOfPreviousResidenceAr: '',
	areaOfCurrentResidenceEn: '',
	areaOfCurrentResidenceTr: '',
	areaOfCurrentResidenceAr: '',
	currentSituationEn: '',
	currentSituationTr: '',
	currentSituationAr: '',
	lossesInWarEn: '',
	lossesInWarTr: '',
	lossesInWarAr: '',
	email: '',
	dateOfBirth: '',
	language: '',
	numberOfFamilyMembers: '',
	numberOfMartyrInFamily: '',
	numberOfInfectedInFamily: '',
	telephoneNumber: '',
	idNumber: '',
	familyMemberDetail: [],
};

export const UpdateFamilyValues = {
	breadWinnerNameEn: '',
	breadWinnerNameTr: '',
	breadWinnerNameAr: '',
	descriptionEn: '',
	descriptionTr: '',
	descriptionAr: '',
	maritalStatusEn: '',
	maritalStatusAr: '',
	maritalStatusTr: '',
	genderEn: '',
	genderAr: '',
	genderTr: '',
	areaOfPreviousResidenceEn: '',
	areaOfPreviousResidenceAr: '',
	areaOfPreviousResidenceTr: '',
	areaOfCurrentResidenceEn: '',
	areaOfCurrentResidenceAr: '',
	areaOfCurrentResidenceTr: '',
	currentSituationEn: '',
	currentSituationAr: '',
	currentSituationTr: '',
	lossesInWarEn: '',
	lossesInWarAr: '',
	lossesInWarTr: '',
	email: '',
	language: '',
	dateOfBirth: '',
	numberOfFamilyMembers: '',
	numberOfMartyrInFamily: '',
	numberOfInfectedInFamily: '',
	telephoneNumber: '',
	idNumber: '',
	currentSituation: '',
};

// export const Links = [
// 	{ localeId: 'links.0', name: 'Support', link: '/support' },
// 	{ localeId: 'links.1', name: 'Sponsor', link: '/sponsor' },
// 	{
// 		localeId: 'links.2',
// 		name: 'Empower',
// 		link: '/empower',
// 	},
// 	{
// 		localeId: 'links.3',
// 		name: 'FAQs',
// 		link: '/faqs',
// 	},
// 	{
// 		localeId: 'links.4',
// 		name: 'Contact',
// 		link: '/contact',
// 	},
// ];

export const FAMILIESCOLUMN: any = [
	{ Header: 'Sno', accessor: 'no' },
	{ Header: 'Id', accessor: '_id' },
	{
		Header: 'BreadWinnerName',
		accessor: (row: any) => row.breadWinnerName.inEnglish,
	},
	// { Header: 'MartyrInFamily', accessor: 'numberOfMartyrInFamily' },
	{ Header: 'NumberOfFamilyMember', accessor: 'numberOfFamilyMembers' },
	{ Header: 'Action', accessor: 'view' },
];
export const PENDINGFAMILIESCOLUMN: any = [
	{ Header: 'Sno', accessor: 'no' },
	{ Header: 'Email', accessor: 'email' },
	{ Header: 'NumberOfFamilyMember', accessor: 'numberOfFamilyMembers' },
	{ Header: 'Action', accessor: 'view' },
	// { Header: 'Action', accessor: 'approved' },
	{ Header: 'Action', accessor: 'approval' },
];
export const Links = [
	{ localeId: 'links.0', name: 'Home', link: '/' },
	{ localeId: 'links.2', name: 'About', link: '/about' },
	{ localeId: 'links.1', name: 'Families', link: '/families' },
	{ localeId: 'links.3', name: 'FAQs', link: '/faqs' },
	{ localeId: 'links.4', name: 'Contact Us', link: '/contact' },
];

export const LOGININITIALVALUES: LoginSchema = {
	email: '',
	password: '',
};

export const BECOMESPONSORINITIALVALUES = {
	name: '',
	country: '',
	email: '',
	password: '',
	language: '',
	confirmPassword: '',
};

export const APPROVEDCOLUMN: any = [
	{ Header: 'Sno', accessor: 'no' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Email', accessor: 'email' },
	{ Header: 'Country', accessor: 'country' },
	{ Header: 'Language', accessor: 'language' },
];

export const SPONSERFAMILIESCOLUMN: any = [
	// { Header: 'Sno', accessor: 'no' },
	// { Header: 'Name', accessor: 'name' },
	{ Header: 'Area', accessor: 'areaOfCurrentResidence' },
	{ Header: 'Losses In War', accessor: 'lossesInWar' },
	{ Header: '# Martyr In Family', accessor: 'numberOfMartyrInFamily' },
];

export const REJECTEDCOLUMN: any = [
	{ Header: 'Sno', accessor: 'no' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Email', accessor: 'email' },
	{ Header: 'Country', accessor: 'country' },
	{ Header: 'Language', accessor: 'language' },
	{ Header: 'Action', accessor: 'delete' },
];
export const DASHBOARDCOLUMN: any = [
	{ Header: 'Sno', accessor: 'no' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Email', accessor: 'email' },
	{ Header: 'Role', accessor: 'role' },
	// { Header: 'Action', accessor: 'delete' },
];
export const PENDINGCOLUMN: any = [
	{ Header: 'Sno', accessor: 'no' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Email', accessor: 'email' },
	{ Header: 'Country', accessor: 'country' },
	{ Header: 'Language', accessor: 'language' },
];


export const SPONSORDATA: any = [
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		country: 'Saudia Arabia',
		postalCode: 123456,
	},
	{
		id: '2345678901',
		name: 'testuser123',
		email: 'testuser1@gmail.com',
		country: 'Saudia Arabia',
		postalCode: 123456,
	},
	{
		id: '3456789012',
		name: 'testuser',
		email: 'testuser123@gmail.com',
		country: 'Saudia Arabia',
		postalCode: 123456,
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		country: 'Saudia Arabia',
		postalCode: 123456,
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		country: 'Saudia Arabia',
		postalCode: 123456,
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		country: 'Saudia Arabia',
		postalCode: 123456,
	},
];
export const DASHBOARDDATA: any = [
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role: 'Admin',
	},
	{
		id: '2345678901',
		name: 'testuser123',
		email: 'testuser1@gmail.com',
		role: 'user',
	},
	{
		id: '3456789012',
		name: 'testuser',
		email: 'testuser123@gmail.com',
		role: 'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role: 'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role: 'Admin',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role: 'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role: 'Admin',
	},
	{
		id: '2345678901',
		name: 'testuser123',
		email: 'testuser1@gmail.com',
		role: 'user',
	},
	{
		id: '3456789012',
		name: 'testuser',
		email: 'testuser123@gmail.com',
		role: 'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role: 'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role: 'Admin',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role: 'user',
	},
];
export const dashboard = [
	{
		name: 'Total Families',
		value: '21245',
	},
	{
		name: 'Total Approved Sponsors',
		value: '1214',
	},
	{
		name: 'Amount Received',
		value: '$110,224',
	},
	{
		name: 'Form Responses',
		value: 56,
	},
];

export const TESTINOMIALS = [
	{
		name: 'Dr. Maged Radwan',
		destination: 'Manager, Wijdan Charity',
		description:
			'An initiative that came on time given the great need of our people in Gaza for such support and assistance',
	},
	{
		name: 'Jane Smith',
		destination: 'Marketing Manager at ABC Corp.',
		description:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
	{
		name: 'Michael Johnson',
		destination: 'Head of Sales at DEF Company',
		description:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	},
	{
		name: 'Michael Johnson',
		destination: 'Head of Sales at DEF Company',
		description:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	},
	{
		name: 'Michael Johnson',
		destination: 'Head of Sales at DEF Company',
		description:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	},
	// Add more testimonials as needed
];
