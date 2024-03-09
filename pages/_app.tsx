import { Provider } from 'react-redux';
import store from './../state/store'; // Import your Redux store
import Navbar from '../components/UI/Navbar';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <>
        <Navbar isLoggedIn={true}/>
        <Component {...pageProps} />
      </>
    </Provider>
  );
}

export default MyApp;
