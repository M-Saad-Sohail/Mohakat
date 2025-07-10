import { UserType, FamilyType } from './../state/user/types';
// import { FamilyType } from './../state/family/types';
import { KEYS, FAMILY_KEYS } from './../types';

export const getUserInfoFromLocalStorage = () => {
	const result = localStorage.getItem(KEYS.USER);
	if (result) {
		const user: UserType = JSON.parse(result);
		return user;
	}
	return null;
};

export const saveUserInfoInLocalStorage = (user: UserType) => {
	const data = JSON.stringify(user);
	const token = user.key;
	localStorage.setItem(KEYS.TOKEN, token);
	localStorage.setItem(KEYS.USER, data);
};

export const deleteUserInfoFromLocalStorage = () => {
	localStorage.removeItem(KEYS.USER);
	localStorage.removeItem(KEYS.TOKEN);
};

// FAMILY
export const getFamilyInfoFromLocalStorage = () => {
	const result = localStorage.getItem(FAMILY_KEYS.FAMILY);
	if (result) {
		const family: FamilyType = JSON.parse(result);
		return family;
	}
	return null;
};
export const saveFamilyInfoInLocalStorage = (family: FamilyType) => {
	const data = JSON.stringify(family);
	const token = family.key;
	localStorage.setItem(FAMILY_KEYS.TOKEN, token);
	localStorage.setItem(FAMILY_KEYS.FAMILY, data);
};

export const deleteFamilyInfoFromLocalStorage = () => {
	localStorage.removeItem(FAMILY_KEYS.FAMILY);
	localStorage.removeItem(FAMILY_KEYS.TOKEN);
};
