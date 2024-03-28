import { UserType } from './../state/user/types';
import { KEYS } from './../types';

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
