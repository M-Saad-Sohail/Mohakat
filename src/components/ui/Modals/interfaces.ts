export interface ViewModalProps {
	openModal: boolean | undefined;
	onClose: () => void;
	id: any;
	tableName?: string;
	onTableRefresh: () => void;
}

export interface FamilyMember {
	memberName: {
		inEnglish: string;
		inTurkish: string;
		inArabic: string;
	};
	memberGender: {
		inEnglish: string;
		inTurkish: string;
		inArabic: string;
	};
	memberAge: number | '';
	MemberIdNumber: number | '';
}