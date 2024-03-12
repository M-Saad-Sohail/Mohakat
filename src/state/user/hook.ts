import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../state/store';
import { setUserAction, updateUserAction } from '.';
import { UpdateUserType, UserSliceType } from './types';
import {
	deleteUserInfoFromLocalStorage,
	getUserInfoFromLocalStorage,
	saveUserInfoInLocalStorage,
} from './../../lib/cache';

export const useUser = () => {
	const { isAuthenticated, user } = useSelector<RootState, UserSliceType>(
		(state) => state.user,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		const userInfo = getUserInfoFromLocalStorage();
		if (userInfo && !user) {
			dispatch(setUserAction({ user: userInfo, isAuthenticated: true }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, user]);

	const setUser = (payload: UserSliceType) => {
		dispatch(setUserAction(payload));
		if (payload.user) saveUserInfoInLocalStorage(payload.user);
		else deleteUserInfoFromLocalStorage();
	};

	const updateUser = (payload: UpdateUserType) => {
		if (user) {
			dispatch(updateUserAction(payload));
			saveUserInfoInLocalStorage({
				...user,
				...payload,
			});
		}
	};

	return {
		isAuthenticated,
		user,
		setUser,
		updateUser,
	};
};
