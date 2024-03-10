import { Provider } from 'react-redux';
import store from './../state/store'; // Import your Redux store
import Navbar from '../components/UI/Navbar';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AUTHPATHS } from '../contants';
import AppNavbar from '../components/UI/Navbar/AppNavbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <>
        <Navbar/>
        <Component {...pageProps} />
      </>
    </Provider>
  );
}

export default MyApp;
