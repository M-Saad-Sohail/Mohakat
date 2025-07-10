'use client';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useLoading } from '@/state/loading/hook';
import { useUser } from '@/state/user/hook';
import { UserType, FamilyType } from '@/state/user/types';
import { UserCredentials, RegisterUserCredentials, FamilyCredentials } from '@/types';
import api, { publicApi } from '@/config/axios';
import useLocaleRouter from './useLocaleRouter';
import { PATHS } from '@/contants';
import { OTP_KEY } from '@/contants/storage';
import UserNotVerifiedError from '@/errors/UserNotVerifiedError';
import FamilyNotVerifiedError from '@/errors/FamilyNotVerifiedError';
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
	const { url } = useLocaleRouter();

	const loginUser = useCallback(
		async (credentials: UserCredentials) => {
			try {
				setIsLoading(true);
				const { data, ...rest } = await publicApi.post(
					`/login`,
					credentials,
				);
				
				const user: UserType = {
					key: data.token,
					avator: data.sponser.avator, // Corrected key name
					email: data.sponser.email, // Corrected key name
					name: data.sponser.name, // Corrected key name
					role: data.sponser.role, // Corrected key name
					status: data.sponser?.status,
					verified: data.sponser?.verified, // Corrected key name
					uniqueId: data.sponser.uniqueId,
					__v: data.sponser.__v, // Corrected key name
					id: data.sponser._id, // Corrected key name,
					country: data.sponser.country,
					language: data.sponser?.language ?? 'en',
				};
				if (!user.verified) {
					throw new Error(`Please verify first`);
				}
				// console.log("user", user)
				toast.success('Login Successful.');
				setUser({ user, isAuthenticated: true });
				return user;
			} catch (e) {
				handleError(e)
				if (e instanceof AxiosError && e.response?.status === 403) {
					// window.location.href = url(PATHS.RESEND_OTP);
					throw new UserNotVerifiedError()
				}
				return null;
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
				if (!data.success) {
					throw new Error('Some error has occurred! Please try again.');
				}
				localStorage.setItem(OTP_KEY, data.sponsorId);
				toast.success(data.data);
				return true;
			} catch (e) {
				handleError(e)
				return false;
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
		// window.location.href = url(PATHS.LOGIN);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setUser]);

	const verifyOtp = useCallback(async (otp: string) => {
		try {
			setIsLoading(true);
			const id = localStorage.getItem(OTP_KEY);
			if (!id) {
				throw new Error(`Otp expired`);
			}
			const { data } = await publicApi.put(
				`/sponser/verify/${id}`,
				{ otp },
			);
			toast.success(data.message);
			localStorage.removeItem(OTP_KEY);
			return true;
		} catch (e) {
			handleError(e)
			return false;
		} finally {
			setIsLoading(false);
		}
	}, [setIsLoading])

	const resendOtp = useCallback(async (email: string) => {
		try {
			setIsLoading(true);
			const { data } = await publicApi.post(
				`/sponser/resend/otp`,
				{ email },
			);
			setIsLoading(false);
			toast.success(data.data);
			localStorage.setItem(OTP_KEY, data.sponsorId)
			return true;
		} catch (e) {
			handleError(e)
			setIsLoading(false);
			return false;
		}
	}, [setIsLoading])

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

	const familyverifyOtp = useCallback(async (otp: string) => {
		try {
			setIsLoading(true);
			const id = localStorage.getItem("FAMILY_OTP_KEY");
			console.log(id)
			if (!id) {
				throw new Error(`Otp expired`);
			}
			const { data } = await publicApi.put(
				`/family-verify/${id}`,
				{ otp },
			);
			toast.success(data.message);
			localStorage.removeItem(OTP_KEY);
			return true;
		} catch (e) {
			handleError(e)
			return false;
		} finally {
			setIsLoading(false);
		}
	}, [setIsLoading])


	const familyresendOtp = useCallback(async (email: string) => {
		try {
			setIsLoading(true);
			const { data } = await publicApi.post(
				`/family-resend-code`,
				{ email },
			);
			setIsLoading(false);
			toast.success(data.data);
			localStorage.setItem(OTP_KEY, data.familyId)
			return true;
		} catch (e) {
			handleError(e)
			setIsLoading(false);
			return false;
		}
	}, [setIsLoading])


	const loginFamily = useCallback(
		async (credentials: FamilyCredentials) => {
			try {
				setIsLoading(true);
				const { data, ...rest } = await publicApi.post(
					`/family-login`,
					credentials,
				);
				
				const user: FamilyType = {
					key: data?.token,
					email: data?.sponser.email, // Corrected key name
					breadWinnerName: data?.sponser?.breadWinnerName, // Corrected key name
					role: data?.sponser?.role, // Corrected key name
					verified: data?.sponser?.verified, // Corrected key name
					__v: data?.sponser?.__v, // Corrected key name
					id: data?.sponser?._id, // Corrected key name,
					country: data?.sponser?.country,
					language: data?.sponser?.language ?? 'en',
					numberOfFamilyMembers: data?.sponser?.numberOfFamilyMembers,
					numberOfMartyrInFamily: data?.sponser?.numberOfMartyrInFamily,
					numberOfInfectedInFamily: data?.sponser?.numberOfInfectedInFamily,
					idNumber: data?.sponser?.idNumber,
					telephoneNumber: data?.sponser?.telephoneNumber,
					avator: data?.sponser?.avator,
					name: data?.sponser?.name,
					uniqueId: data?.sponser?.uniqueId,
					status: data?.sponser?.status,
				};
				if (user.verified != true) {
						throw new Error(`Please verify first`);
					}
				toast.success('Login Successful.');
				setUser({ user, isAuthenticated: true });
				return user;
			} catch (e) {
				handleError(e)
				if (e instanceof AxiosError && e.response?.status === 403) {
					// window.location.href = url(PATHS.RESEND_OTP);
					throw new FamilyNotVerifiedError()
				}
				console.log("Family error", e)
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setIsLoading, setUser, url], );

		const updatePasswordFamily = useCallback(
			async (credentials: ResetPassword, id: String | undefined) => {
				try {
					setIsLoading(true);
					const { data } = await api.put(
						`/family/update/password/${id}`,
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
		verifyOtp,
		resendOtp,
		familyverifyOtp,
		familyresendOtp,
		loginFamily,
		updatePasswordFamily
	};
};
