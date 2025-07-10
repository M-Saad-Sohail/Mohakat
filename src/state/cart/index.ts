import { createSlice } from '@reduxjs/toolkit';

const initialState: any[] = [];

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setIsAddCartStateAction: (
			state,
			action: {
				payload: any; // Correcting payload structure
			},
		) => {
			return [
				...state,
				action.payload, // Each object contains a key-value pair
			];
		},
		setIsRemoveCartStateAction: (
			state,
			action: {
				payload: { id: any }; // Correcting payload structure
			},
		) => {
			return state.filter((item) => item._id !== action.payload.id);
		},
	},
});

export const { setIsAddCartStateAction, setIsRemoveCartStateAction } =
	cartSlice.actions;

export default cartSlice.reducer;
