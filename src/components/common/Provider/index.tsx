'use client';
import store from '@/state/store';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';
import tr from '@/i18n/tr.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { Provider as ReduxProvider } from 'react-redux';
import { ReactNode } from 'react';

const messages: Record<string, any> = {
	en,
	ar,
	tr,
};

type ProviderProps = {
	children: ReactNode;
	locale: string;
};

const Provider = (props: ProviderProps) => {
	return (
		<ReduxProvider store={store}>
			<div>{props.children}</div>
			<ToastContainer />
		</ReduxProvider>
	);
};

export default Provider;
