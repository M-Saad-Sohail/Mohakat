import { Provider } from 'react-redux';
import store from './../state/store'; // Import your Redux store
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AUTHPATHS } from '../contants';
import Navbar from '../components/UI/Navbar';
import en from '../i18n/en.json'
import ar from '../i18n/ar.json'
import tr from '../i18n/tr.json'
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import { getDirection } from '../utils/get-direction';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const messages: Record<string, Record<string, string>> = {
  en,
  ar,
  tr
}



function MyApp({ Component, pageProps }: AppProps) {
  const { locale = 'en' } = useRouter()

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Provider store={store}>
        <>
          <Navbar />
          <Component {...pageProps} dir={getDirection(locale)} />
          <ToastContainer />
        </>
      </Provider>
    </IntlProvider>
  );
}

export default MyApp;
