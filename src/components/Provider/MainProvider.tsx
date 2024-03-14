'use client';
import Navbar from '@/components/UI/Navbar';
import store from '@/state/store';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';
import tr from '@/i18n/tr.json';
import { IntlProvider } from 'react-intl';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

const messages: Record<string, Record<string, string>> = {
	en,
	ar,
	tr,
};

type MainProviderProps = {
	children: React.ReactNode;
};

const MainProvider = (props: MainProviderProps) => {
	const locale = 'en';

	return (
		<Provider store={store}>
			<IntlProvider locale={locale} messages={messages[locale]}>
				<Navbar />
				{props.children}
				<ToastContainer />
			</IntlProvider>
		</Provider>
	);
};

export default MainProvider;
