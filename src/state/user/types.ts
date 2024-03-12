export type UserType = {
	key: string;
	avator: any;
	createdAt: string;
	email: string;
	name: string;
	no_of_sponsor: number;
	password: string;
	role: string;
	status: string;
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
