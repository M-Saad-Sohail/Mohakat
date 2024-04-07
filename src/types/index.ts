import {
	loginSchema,
	becomeSponsorSchema,
	resetPasswordSchema,
	updateProfileSchema,
} from './../utils/validationSchema';
import { InferType } from 'yup';
export type ResetPasswordSchema = InferType<typeof resetPasswordSchema>;
export type LoginSchema = InferType<typeof loginSchema>;
export type BecomeSponsorSchema = InferType<typeof becomeSponsorSchema>;
export type UpdateProfileSchema = InferType<typeof updateProfileSchema>;
export type UserCredentials = {
	password: string;
	email: string;
};

export type RegisterUserCredentials = {
	name: string;
	country: string;
	email: string;
	password: string;
	language: string;
	confirmPassword: string;
};
export enum KEYS {
	USER = 'user',
	TOKEN = 'token_dg',
}

export type FamilyModalType = {
	open: boolean;
	setOpen: (value: boolean) => void;
	cancelButtonRef: any;
};
