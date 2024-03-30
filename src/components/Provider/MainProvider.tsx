'use client';
import Navbar from '@/components/UI/Navbar';
import store from '@/state/store';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';
import tr from '@/i18n/tr.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';

const messages: Record<string, any> = {
	en,
	ar,
	tr,
};

type MainProviderProps = {
	children: ReactNode;
	locale: string;
};

const MainProvider = (props: MainProviderProps) => {
	return (
		<Provider store={store}>
			<Navbar />
			<div>{props.children}</div>
			<ToastContainer />
		</Provider>
	);
};

export default MainProvider;
