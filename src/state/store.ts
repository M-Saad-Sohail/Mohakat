import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //
import UserReducer from './../state/user';
import LoadingReducer from './../state/loading';
import LandingReducer from './landingpage';
import cartReducer from './cart';
import currencyReducer from './currency';

const rootReducer = combineReducers({
	user: UserReducer,
	loading: LoadingReducer,
	landingpage: LandingReducer,
	cart: cartReducer,
	currency: currencyReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['loading', 'landingpage', 'cart', 'currency'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		});
	},
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppDispatch = typeof store.dispatch;
