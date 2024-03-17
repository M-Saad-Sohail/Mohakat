import { BecomeSponsorSchema, LoginSchema,ResetPasswordSchema } from '../types';
export const PATHS = {
	HOME: '/',
	FORGETPASSWORD: '/forget-password',
	LOGIN: '/sign-in',
	SPONSOR: '/become-sponsor',
	VERIFICATION: '/verification',
};
export const RESETINITIALVALUES: ResetPasswordSchema = {
	password:'',
	new_password1: "",
	new_password2: "",
  };

export const Links = [
	{ localeId: 'links.0', name: 'Support', link: '/support' },
	{ localeId: 'links.1', name: 'Sponsor', link: '/become-sponsor' },
	{
		localeId: 'links.2',
		name: 'Empower',
		link: '/emPower',
	},
	{
		localeId: 'links.3',
		name: 'FAQs',
		link: 'faqs',
	},
	{
		localeId: 'links.4',
		name: 'Contact',
		link: '/contact',
	},
];

export const LOGININITIALVALUES: LoginSchema = {
	email: '',
	password: '',
};
export const BECOMESPONSORINITIALVALUES: BecomeSponsorSchema = {
	name: '',
	country: '',
	email: '',
	password: '',
	language: '',
	confirmPassword: '',
};
export const AUTHPATHS = {
	HOME: '/',
	FORGETPASSWORD: '/forget-password',
	LOGIN: '/sign-in',
	SPONSOR: '/become-sponsor',
	VERIFICATION: '/verification',
};
export const APPROVEDCOLUMN: any = [
	{ Header: 'S.NO', accessor: 'no' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Email', accessor: 'email' },
	{ Header: 'Country', accessor: 'country' },
	{ Header: 'Language', accessor: 'language' },
];

export const REJECTEDCOLUMN: any = [
	{ Header: 'S.NO', accessor: 'no' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Email', accessor: 'email' },
	{ Header: 'Country', accessor: 'country' },
	{ Header: 'Action', accessor: 'delete' },
];
export const DASHBOARDCOLUMN: any = [
	{ Header: 'S.NO', accessor: 'no' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Email', accessor: 'email' },
	{ Header: 'Role', accessor: 'role' },
	{ Header: 'Action', accessor: 'delete' },
];
export const PENDINGCOLUMN: any = [
	{ Header: 'S.NO', accessor: 'no' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Email', accessor: 'email' },
	{ Header: 'Country', accessor: 'country' },
	{ Header: 'Language', accessor: 'language' },
	{ Header: 'Action', accessor: 'action' },
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
		role:'Admin',
	
	},
	{
		id: '2345678901',
		name: 'testuser123',
		email: 'testuser1@gmail.com',
		role:'user',
	},
	{
		id: '3456789012',
		name: 'testuser',
		email: 'testuser123@gmail.com',
		role:'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role:'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role:'Admin',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role:'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role:'Admin',
	
	},
	{
		id: '2345678901',
		name: 'testuser123',
		email: 'testuser1@gmail.com',
		role:'user',
	},
	{
		id: '3456789012',
		name: 'testuser',
		email: 'testuser123@gmail.com',
		role:'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role:'user',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role:'Admin',
	},
	{
		id: '1234567890',
		name: 'testuser12',
		email: 'testuser@gmail.com',
		role:'user',
	},
];
export const dashboard=[
	{
		name:'Total Families',
		value:"21245"
	},
	{
		name:'Total Approved Sponsors',
		value:"1214"
	},
	{
		name:'Amount Received',
		value:"$110,224"
	},
	{
		name:'Form Responses',
		value:56
	},
]