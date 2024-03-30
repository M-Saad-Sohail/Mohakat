'use client';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useLoading } from '@/state/loading/hook';
import { useUser } from '@/state/user/hook';
import { UserType } from '@/state/user/types';
import { UserCredentials, RegisterUserCredentials } from '@/types';
import api, { publicApi } from '@/config/axios';
import useLocaleRouter from './useLocaleRouter';
import { PATHS } from '@/contants';
export type ResetPassword = {
	oldPassword: string | undefined;
	confirmPassword: String;
	newPassword: String;
};

const handleError = (e: unknown) => {
	if (e instanceof AxiosError) toast.error(e.response?.data.message);
	else if (e instanceof Error) toast.error(e.message);
	else toast.error('Some error has occurred! Please try again.');
}

export const useAuth = () => {
	const { isLoading, setIsLoading } = useLoading();
	const { setUser } = useUser();
	const { url, redirectWithLocale } = useLocaleRouter();

	const loginUser = useCallback(
		async (credentials: UserCredentials) => {
			try {
				setIsLoading(true);
				const { data, ...rest } = await publicApi.post(
					`/login`,
					credentials,
				);
				console.log(data, rest)
				const user: UserType = {
					key: data.token,
					avator: data.sponser.avator, // Corrected key name
					createdAt: data.sponser.createdAt, // Corrected key name
					email: data.sponser.email, // Corrected key name
					name: data.sponser.name, // Corrected key name
					role: data.sponser.role, // Corrected key name
					status: data.sponser.status, // Corrected key name
					__v: data.sponser.__v, // Corrected key name
					id: data.sponser._id, // Corrected key name,
					country: data.sponser.country,
					language: data.sponser?.language ?? 'en',
				};
				if (data.success) {
					// redirectWithLocale(user.language, PATHS.DASHBOARD);
				}
				toast.success('Login Successful.');
				setUser({ user, isAuthenticated: true });
			} catch (e) {
				console.log({ e })
				handleError(e)
			} finally {
				setIsLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setIsLoading, setUser, url],
	);

	const registerUser = useCallback(
		async (credentials: Omit<RegisterUserCredentials, 'confirmPassword'>) => {
			try {
				setIsLoading(true);
				const { data } = await publicApi.post('/register', credentials);
				if (data.success) {
					toast.success('Register Successful.');
					window.location.href = url(PATHS.VERIFICATION);
					return;
				}
				throw new Error('Some error has occurred! Please try again.');
			} catch (e) {
				handleError(e)
			} finally {
				setIsLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setIsLoading, setUser],
	);

	const logoutUser = useCallback(() => {
		localStorage.removeItem('user');
		setUser({ user: undefined, isAuthenticated: false });
		window.location.href = url(PATHS.LOGIN);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setUser]);


	const updatePassword = useCallback(
		async (credentials: ResetPassword, id: String | undefined) => {
			try {
				setIsLoading(true);
				const { data } = await api.put(
					`/sponser/update/password/${id}`,
					credentials,
				);
				toast.success('Update Password Successful.');
			} catch (e) {
				handleError(e)
			} finally {
				setIsLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setIsLoading, setUser],
	);
	return {
		loginUser,
		registerUser,
		logoutUser,
		isLoading,
		updatePassword,
	};
};
