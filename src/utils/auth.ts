import { useRouter } from 'next/navigation';
import { UserType } from '../state/user/types';

export const navigateToDashboardIfLoggedIn = (
	router: ReturnType<typeof useRouter>,
) => {
	const tokenString = localStorage.getItem('user');
	if (tokenString && JSON.parse(tokenString).key) {
		router.push('/dashboard');
	}
};

export const isAdminUserLoggedIn = (): boolean => {
	const userString = localStorage.getItem('user');
	if (userString) {
		const user = JSON.parse(userString);
		return user.role === 'admin';
	}
	return false;
};

export const getUserFromLocalStorage = () => {
	if (typeof window !== 'undefined') {
		const userString = localStorage.getItem('user');
		if (userString) {
			try {
				return JSON.parse(userString) as UserType;
			} catch (error) {
				return null;
			}
		}
	}
	return null; // or any other default value if needed
};
