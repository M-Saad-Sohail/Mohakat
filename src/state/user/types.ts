export type UserType = {
	key: string;
	avator: any;
	email: string;
	name: string;
	country: string;
	language: string;
	role: string;
	status: string;
	verified: boolean;
	uniqueId: any;
	__v: string;
	id: string;
};
export type FamilyType = {
	key: string;
	email: string;
	breadWinnerName: string | undefined;
	country: string;
	language: string;
	role: string;
	verified: boolean;
	__v: string;
	id: string;
	numberOfFamilyMembers: string;
	numberOfMartyrInFamily: string;
	numberOfInfectedInFamily: string;
	idNumber: any;
	telephoneNumber: any;
	avator: any | undefined;
	name: any | undefined;
	uniqueId: any | undefined;
	status: any | undefined;
};

export type UserSliceType = {
	isAuthenticated: boolean;
	user: UserType | FamilyType | undefined;
};

export type UpdateUserType = {
	[key: string]: string | number;
};
