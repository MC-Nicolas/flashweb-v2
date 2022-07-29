import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
