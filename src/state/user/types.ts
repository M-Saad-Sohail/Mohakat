export type UserType = {
	key: string;
	avator: any;
	createdAt: string;
	email: string;
	name: string;
	country: string;
	language: string;
	role: string;
	status: string;
	verified: boolean;
	__v: string;
	id: string;
};

export type UserSliceType = {
	isAuthenticated: boolean;
	user: UserType | undefined;
};

export type UpdateUserType = {
	[key: string]: string | number;
};
