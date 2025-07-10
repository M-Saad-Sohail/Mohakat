import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {};

const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setIsCurrencyStateAction: (state, action: PayloadAction<any>) => {
			return action.payload;
		},
	},
});

export const { setIsCurrencyStateAction } = currencySlice.actions;

export default currencySlice.reducer;
