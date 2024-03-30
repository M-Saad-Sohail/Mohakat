import axios from 'axios';
import { redirect } from 'next/navigation';
import { getUserInfoFromLocalStorage } from '@/lib/cache';
import { PATHS } from '@/contants';

// Function to handle logout
const logout = () => {
	localStorage.removeItem('user');
	redirect(PATHS.LOGIN);
};

// Create Axios instance
export const publicApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
});

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
});

api.interceptors.request.use(
	async (config) => {
		const user = getUserInfoFromLocalStorage();
		if (user) {
			config.headers.Authorization = `${user.key}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			logout();
		}
		return Promise.reject(error);
	},
);

export default api;
