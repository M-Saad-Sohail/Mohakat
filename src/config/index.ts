import axios from 'axios';
import { getUserInfoFromLocalStorage } from './../lib/cache';
/**
 * axios instance
 */
export const api = axios.create({
	baseURL: process.env.REACT_APP_PUBLIC_BASE_URL,
});
// request header
api.interceptors.request.use(
	async (config) => {
		const user = getUserInfoFromLocalStorage();
		if (user) {
			config.headers.Authorization = 'Token ' + user.key;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// response parse
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		throw error;
	},
);
