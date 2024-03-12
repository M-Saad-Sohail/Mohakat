import { loginSchema, becomeSponsorSchema } from './../utils/validationSchema';
import { InferType } from 'yup';

export type LoginSchema = InferType<typeof loginSchema>;
export type BecomeSponsorSchema = InferType<typeof becomeSponsorSchema>;
export type UserCredentials = {
	password: string;
	email: string;
};
export type RegisterUserCredentials = {
	name: string;
	fatherName: string;
	postalCode: string;
	country: string;
	gender: string;
	cnicNumber: string;
	email: string;
	password: string;
	// new_password2: string,
	address: string;
};
export enum KEYS {
	USER = 'user',
	TOKEN = 'token_dg',
}
