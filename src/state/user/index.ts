import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateUserType, UserSliceType } from './types';

const initialState: UserSliceType = {
	isAuthenticated: false,
	user: undefined,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserAction: (state, action: PayloadAction<UserSliceType>) => {
			state.isAuthenticated = action.payload.isAuthenticated;
			state.user = action.payload.user;
		},
		updateUserAction: (state, action: PayloadAction<UpdateUserType>) => {
			if (state.user) {
				state.user = { ...state.user, ...action.payload };
			}
		},
	},
});

export const { setUserAction, updateUserAction } = userSlice.actions;

export default userSlice.reducer;
