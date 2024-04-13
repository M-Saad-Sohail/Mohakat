import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {};

const landingSlice = createSlice({
	name: 'landingpage',
	initialState,
	reducers: {
		setIsLandingStateAction: (
			state,
			action: {
				payload: { key: string; value: any }; // Correcting payload structure
			},
		) => {
			const { key, value } = action.payload;
			return {
				...state,
				[key]: value, // Each object contains a key-value pair
			};
		},
	},
});

export const { setIsLandingStateAction } = landingSlice.actions;

export default landingSlice.reducer;
